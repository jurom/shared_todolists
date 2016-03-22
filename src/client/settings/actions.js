import {createActions} from '../vlux'
import {update} from '../../common/firebase_actions'

export const actions = createActions('settings', [
  'toggleShow'
])

export function create(dispatch, router, firebase, getState) {

  return {
    updateProfile(profile) {
      const uid = getState().getIn(['auth', 'uid'])
      return update(firebase.child(`user/profile/${uid}`), profile)
    },
  }
}
