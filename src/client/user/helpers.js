import {fromJS} from 'immutable'

export function isLoaded(user) {
  if (user == null) return false
  return fromJS(['role', 'profile']).every((key) => user.has(key))
}

export function getName(user) {
  const {profile: {firstName, lastName}} = user
  return `${firstName} ${lastName}`
}
