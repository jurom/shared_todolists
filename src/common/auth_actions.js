import {set} from './firebase_actions'

export const storeUser = (firebase, {uid, email, profile}) => {
  return Promise.all([
    set(firebase.child(`user/profile/${uid}`), {...profile, email}),
    set(firebase.child(`user/role/${uid}`), {
      type: 'user',
      blocked: false
    })
  ])
}
