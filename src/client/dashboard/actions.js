import {createActions} from '../vlux'

export const actions = createActions('dashboard', [
  'test'
])

export function create(dispatch, router, getState) {
  return {
    test(res) {
      dispatch(actions.test, res)
    }
  }
}
