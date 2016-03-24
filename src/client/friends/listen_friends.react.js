import React from 'react'
import {Component} from 'vlux'
import {listenFirebase} from '../helpers/listen_firebase.react'
import {actions} from './actions'

const ListenFriendIds = listenFirebase(
  (props) => props.firebase.child(`friend/list/${props.uid}`),
  (e, props, data) => props.dispatch(actions.onFriendIds, Object.keys(data.val() || []))
)

const listenFriendRequests = (sentOrReceived) => listenFirebase(
  (props) => props.firebase.child(`friend/request/${sentOrReceived}/${props.uid}`),
  (e, props, data) => props.dispatch(actions.onFriendRequests, [sentOrReceived, data.val() || {}])
)

export class ListenFriends extends Component {

  static propTypes = {
    firebase: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    uid: React.PropTypes.string.isRequired,
  }

  render() {
    const ListenSentRequests = listenFriendRequests('sent')
    const ListenReceivedRequests = listenFriendRequests('received')
    const {firebase, dispatch, uid} = this.props

    return (
      <div>
        <ListenSentRequests {...{uid, firebase, dispatch}} />
        <ListenReceivedRequests {...{uid, firebase, dispatch}} />
        <ListenFriendIds {...{uid, firebase, dispatch}} />
      </div>
    )
  }
}
