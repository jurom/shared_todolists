import {createActions} from '../vlux'
import {createUser, authWithPassword} from '../../common/firebase_actions'

export const actions = createActions('auth', [
  'set',
  'authUid',
  'validation',
])

export function create(dispatch, router, firebase, getState, submitTransaction) {

  const redirectTo = (route) => router.push(route)

  const handleAuth = (data) => {
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
  }

  return {

    signup({email, password, firstName, lastName}) {
      return createUser(firebase, {email, password})
        .then(({uid}) => submitTransaction('registerUser', {
          uid, email, profile: {firstName, lastName}
        }).then(() => console.log('authing'))
        )
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

    handleAuth,

    logout() {

      const uid = getState().getIn(['auth', 'uid'])
      const firebaseUid = firebase.getAuth().uid

      if (uid !== firebaseUid) {
        // Auth with different uid => probably admin
        dispatch('clearState', ['auth', 'users'])
        handleAuth({uid: firebaseUid})
        router.push('/admin')
      } else {
        firebase.unauth()
      }
    },
  }

}
