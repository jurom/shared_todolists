import {create as dashboard} from './dashboard/actions'
import {create as auth} from './auth/actions'
import {create as user} from './user/actions'
import {create as settings} from './settings/actions'
import {create as friends} from './friend/actions'
import {create as tasks} from './task/actions'
import {create as messages} from './message/actions'
import {create as admin} from './admin/actions'
import {Map} from 'immutable'

// Action creator
export const create = (dispatch, router, firebase, getState, submitTransaction) => {

  return Map({auth, dashboard, user, settings, friends, tasks, messages, admin})
    .map((fn) => fn(dispatch, router, firebase, getState, submitTransaction))
    .toJS()
}
