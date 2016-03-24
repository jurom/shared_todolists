import {create as dashboard} from './dashboard/actions'
import {create as auth} from './auth/actions'
import {create as user} from './user/actions'
import {create as settings} from './settings/actions'
import {create as friends} from './friends/actions'
import {Map} from 'immutable'

// Action creator
export const create = (dispatch, router, firebase, getState, submitTransaction) => {

  return Map({auth, dashboard, user, settings, friends})
    .map((fn) => fn(dispatch, router, firebase, getState, submitTransaction))
    .toJS()
}
