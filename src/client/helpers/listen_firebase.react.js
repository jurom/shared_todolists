import React from 'react'

// Firebase on/off helper leveraging React component lifecycle to prevent leaks.
// getRef - function taking props and returning a firebase ref to listen on
// action - function taking new data and making appropriate action
// eventTypes - types of firebase events to listen on
export function listenFirebase(getRef, action, eventTypes) {

  class ListenFirebase extends React.Component {

    componentDidMount() {
      this.maybeListenFirebaseRef()
    }

    // Remember, didUpdate is called only when props are changed.
    componentDidUpdate() {
      this.maybeListenFirebaseRef()
    }

    componentWillUnmount() {
      this.unlisten()
    }

    maybeListenFirebaseRef() {
      const newRef = getRef(this.props)
      if (newRef == null) {
        this.unlisten()
        this.ref = null
        return
      }
      if (this.ref) {
        // Ref can be changed, especially when url has been changed.
        const refChanged = this.ref.toString() !== newRef.toString()
        if (!refChanged) return
      }
      this.ref = newRef
      this.listen(newRef)
    }

    listen(ref) {
      // Stop listening old ref.
      this.unlisten()
      const listenTo = eventTypes ? eventTypes : ['value']

      // Listeners per eventType have structure: [firebaseRef, eventType, onDataAction]
      this.listeners = listenTo.map(
        (e) => [ref, e, (...args) => action(e, this.props, ...args)]
      )

      for (let l of this.listeners) l[0].on(l[1], l[2], this.onError)
    }

    unlisten() {
      if (this.listeners == null) return
      for (let l of this.listeners) l[0].off(l[1], l[2])
      this.listeners = null
    }

    onError(error) {
      console.error(error) // eslint-disable-line no-console
    }

    render() {
      return null
    }

  }

  ListenFirebase.displayName = 'ListenFirebase'

  return ListenFirebase
}
