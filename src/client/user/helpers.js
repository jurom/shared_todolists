import {fromJS} from 'immutable'
import {getFriendIdsToListen} from '../friend/helpers'

export function isLoaded(user) {
  if (user == null) return false
  return fromJS(['role', 'profile']).every((key) => user.has(key))
}

export function isBlocked(user) {
  return user.getIn(['role', 'blocked'])
}

export function isAdmin(user) {
  return user.getIn(['role', 'type']) === 'admin'
}

export function getName(user) {
  const {profile: {firstName, lastName}} = user
  return `${firstName} ${lastName}`
}

export function getUserIdsToListen(state) {
  const {friends, auth: {uid = null}} = state
  const friendIds = getFriendIdsToListen(friends)
  // When uid is null, friendIds should be empty but.. whatever
  return uid ? friendIds.add(uid) : friendIds
}
