import {createActions} from '../vlux'

export const actions = createActions('friends', [
  'search',
  'onSearchedFriendIds'
])

export function create(dispatch, router, firebase, getState) {
  return {}
}
