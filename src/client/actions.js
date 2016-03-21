import {create as dashboard} from './dashboard/actions'

// Action creator
export const create = (dispatch, router, firebase, getState) => {

  return {
    dashboard: dashboard(dispatch, router, firebase, getState)
  }
}
