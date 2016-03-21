import {create as dashboard} from './dashboard/actions'
import {create as auth} from './auth/actions'

// Action creator
export const create = (dispatch, router, firebase, getState) => {

  return {
    auth: auth(dispatch, router, firebase, getState),
    dashboard: dashboard(dispatch, router, firebase, getState)
  }
}
