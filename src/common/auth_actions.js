import CryptoJS from 'crypto-js'
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

export function getGravatarHash(email) {
  return CryptoJS.MD5(email.trim().toLowerCase()).toString()
}

export const storeUser = (firebase, {uid, email, profile}) => {
  const gravatarHash = getGravatarHash(email)
  return Promise.all([
    set(firebase.child(`user/profile/${uid}`), {...profile, email, gravatarHash}),
    set(firebase.child(`user/role/${uid}`), {
      type: 'user',
      blocked: false
    })
  ])
  .then(() => updateSearchIndices(firebase, uid))
}
