import React from 'react'
import {Component} from 'vlux'
import {listenFirebase} from '../helpers/listen_firebase.react'
import {actions as userActions} from './actions'

const ListenUserProfile = listenFirebase(
  (props) => props.firebase.child(`user/profile/${props.uid}`),
  (e, props, data) => props.onData(data == null ? {} : data.val())
)

const ListenUserRole = listenFirebase(
  (props) => props.firebase.child(`user/role/${props.uid}`),
  (e, props, data) => props.onData(data == null ? {} : data.val())
)

export class ListenUser extends Component {

  static propTypes = {
    firebase: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    uid: React.PropTypes.string.isRequired
  }

  render() {

    const {firebase, dispatch, uid} = this.props

    return (
      <div>
        <ListenUserProfile
          firebase={firebase}
          uid={uid}
          onData={(data) => dispatch(userActions.onProfile, [uid, data])}
        />
        <ListenUserRole
          firebase={firebase}
          uid={uid}
          onData={(data) => dispatch(userActions.onRole, [uid, data])}
        />
      </div>
    )
  }
}

export class ListenUsers extends Component {

  static propTypes = {
    firebase: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    ids: React.PropTypes.object.isRequired,
  }

  render() {

    const {firebase, dispatch, ids} = this.props
    return (
      <div>
        {ids.map((uid) =>
          <ListenUser {...{uid, firebase, dispatch, key: uid}} />
        )}
      </div>
    )
  }
}
