import {createActions} from '../vlux'

export const actions = createActions('friends', [
  'search',
  'onFriendIds'
])

export function create(dispatch, router, firebase, getState) {
  return {}
}
