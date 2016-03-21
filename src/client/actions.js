import {create as dashboard} from './dashboard/actions'
import {create as auth} from './auth/actions'
import {create as user} from './user/actions'

// Action creator
export const create = (dispatch, router, firebase, getState) => {

  return {
    auth: auth(dispatch, router, firebase, getState),
    dashboard: dashboard(dispatch, router, firebase, getState),
    user: user(dispatch, router, firebase, getState),
  }
}
