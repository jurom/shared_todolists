import {set, read} from './firebase_actions'

export function getProfileSearchIndices(profile) {
  const first = profile.firstName.toUpperCase()
  const last = profile.lastName.toUpperCase()
  return {
    firstLast: `${first}_${last}`,
    lastFirst: `${last}_${first}`,
    email: profile.email.toUpperCase()
  }
}

export function encodeSearch(search) {
  return search.toUpperCase().replace(/\ /g, '_')
}

export const updateSearchIndices = (firebase, uid) => {
  return read(firebase.child(`user/profile/${uid}`))
    .then((profile) => set(firebase.child(`index/user/profile/${uid}`), getProfileSearchIndices(profile)))
}

export const storeUser = (firebase, {uid, email, profile}) => {
  return Promise.all([
    set(firebase.child(`user/profile/${uid}`), {...profile, email}),
    set(firebase.child(`user/role/${uid}`), {
      type: 'user',
      blocked: false
    })
  ])
  .then(() => updateSearchIndices(firebase, uid))
}
