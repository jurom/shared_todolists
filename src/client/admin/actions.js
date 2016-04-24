import {createActions} from '../vlux'
import {set} from '../../common/firebase_actions'
import {create as createAuthActions} from '../auth/actions'

export const actions = createActions('admin', [
  'onUserIds',
  'setPage',
])

export function create(dispatch, router, firebase, getState) {

  const authActions = createAuthActions(dispatch, router, firebase, getState)

  return {

    blockUser(userId, block) {
      return set(firebase.child(`user/role/${userId}/blocked`), block)
    },

    setPage(page) {
      dispatch(actions.setPage, page)
    },

    loginAsUser(userId) {
      authActions.handleAuth({uid: userId})
      router.push('/dashboard')
    }

  }
}
