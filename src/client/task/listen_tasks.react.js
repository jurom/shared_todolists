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


function find(st, end, s) {
  var mid = Math.floor((st + end) / 2)
  if (s === mid) return mid
  if (s > mid) return find(mid, end)
  if (s < mid) return find(st, mid)
}

function findEnd(s) {
  return gallop(1, s)
}

function gallop(k, s) {
  return k < s ? gallop(2 * k, s) : k
}

function guess(s) {
  return find(0, findEnd(s), s)
}
