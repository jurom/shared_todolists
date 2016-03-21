import {isLoaded} from '../user/helpers'

// User statuses
export const REGISTERED = 'registered'
export const LOADING = 'loading'
export const UNREGISTERED = 'unregistered'
export const BLOCKED = 'blocked'

export function registrationStatus(users, auth) {
  if (auth.get('uid') == null) return UNREGISTERED
  const user = users.get(auth.get('uid'))
  if (!isLoaded(user)) return LOADING
  if (user.getIn(['role', 'blocked'])) return BLOCKED
  return REGISTERED
}
