import {create as dashboard} from './dashboard/actions'

// Action creator
export const create = (dispatch, router, getState) => {

  return {
    dashboard: dashboard(dispatch, router, getState)
  }
}
