import {listenFirebase} from '../helpers/listen_firebase.react'
import {actions} from './actions'

export const ListenMyTasks = listenFirebase(
  (props) => props.firebase.child(`task/${props.uid}`),
  (e, props, data) => props.dispatch(actions.onMyTasks, [props.uid, data.val() || {}])
)

export const ListenFriendTasks = listenFirebase(
  (props) => props.firebase.child(`task/${props.friendId}/${props.uid}`),
  (e, props, data) => props.dispatch(actions.onFriendTasks, [props.friendId, props.uid, data.val() || {}])
)
