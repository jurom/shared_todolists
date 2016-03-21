import {createActions} from '../vlux'

export const actions = createActions('user', [
  'onRole',
  'onProfile',
])

export function create(dispatch, router, firebase, getState) {
  return {}
}
