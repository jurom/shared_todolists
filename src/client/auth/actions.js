import {createActions} from '../vlux'
import {set, createUser, authWithPassword} from '../../common/firebase_actions'

export const actions = createActions('auth', [
  'set',
  'authUid',
])

export function create(dispatch, router, firebase, getState) {

  const storeUser = (uid, email, profile) => {
    return Promise.all([
      set(firebase.child(`user/profile/${uid}`), {...profile, email}),
      set(firebase.child(`user/role/${uid}`), {
        type: 'user',
        blocked: false
      })
    ])
  }

  const redirectTo = (route) => router.push(route)

  return {

    signup({email, password, firstName, lastName}) {
      return createUser(firebase, {email, password})
        .then(({uid}) => storeUser(uid, email, {firstName, lastName}))
        .then(() => authWithPassword(firebase, {email, password}))
        .catch((e) => {
          if (e.code === 'EMAIL_TAKEN') {
            console.error('Email taken')
            // TODO: Report error msg to form
          } else {
            console.error('Firebase error: ', e) // eslint-disable-line no-console
          }
        })
    },

    login(email, password) {
      return authWithPassword(firebase, {email, password})
        .catch((e) => {
          console.error('Login error: ', e)
          // TODO: Handle reporting error messages in cases of wrong email/password
        })
    },

    redirectTo,

    handleAuth(data) {
      const oldUid = getState().getIn(['auth', 'uid'])
      const uid = data ? data.uid : null

      // Nothing changed
      if (oldUid === uid) return

      if (uid == null) {
        // User is logged out
        dispatch('clearState', [])
      } else {
        // User is logged in
        dispatch(actions.authUid, uid)
      }
    },

    logout() {
      firebase.unauth()
    },
  }

}
