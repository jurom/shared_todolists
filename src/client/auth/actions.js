import {createActions} from '../vlux'
import {createUser, authWithPassword} from '../../common/firebase_actions'
import {storeUser} from '../../common/auth_actions'

export const actions = createActions('auth', [
  'set',
  'authUid',
  'validation',
])

export function create(dispatch, router, firebase, getState) {

  const redirectTo = (route) => router.push(route)

  return {

    signup({email, password, firstName, lastName}) {
      return createUser(firebase, {email, password})
        .then(({uid}) => storeUser(firebase, {uid, email, profile: {firstName, lastName}}))
        .then(() => authWithPassword(firebase, {email, password}))
        .catch((e) => {
          if (e.code === 'EMAIL_TAKEN') {
            dispatch(actions.validation, [['signup', 'validation', 'email'], {
              valid: false,
              showValidation: true,
              error: 'This email is already taken.'
            }])
          } else {
            console.error('Firebase error: ', e) // eslint-disable-line no-console
          }
        })
    },

    login(email, password) {
      return authWithPassword(firebase, {email, password})
        .catch((e) => {
          const dispatchError = (field, error) =>
            dispatch(actions.validation, [['login', 'validation', field], {
              valid: false,
              showValidation: true,
              error
            }])
          if (e.code === 'INVALID_EMAIL') dispatchError('email', 'Please enter a valid email.')
          else if (e.code === 'INVALID_USER') dispatchError('email', 'This user does not exist.')
          else if (e.code === 'INVALID_PASSWORD') dispatchError('password', 'Password is incorrect.')
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
