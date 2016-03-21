import {fromJS} from 'immutable'

export function isLoaded(user) {
  if (user == null) return false
  return fromJS(['role', 'profile']).every((key) => user.has(key))
}
