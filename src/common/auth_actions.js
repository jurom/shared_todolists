import CryptoJS from 'crypto-js'
import Firebase from 'firebase'

export function getProfileSearchIndices(profile) {
  const {firstName, lastName, email} = profile
  const first = firstName.toUpperCase()
  const last = lastName.toUpperCase()
  return {
    firstLast: `${first}_${last}`,
    lastFirst: `${last}_${first}`,
    email: email.toUpperCase()
  }
}

export function encodeSearch(search) {
  return search.toUpperCase().replace(/\ /g, '_')
}

export const updateSearchIndices = ({read, set}, uid) => {
  return read(['user', 'profile', uid])
    .then((profile) => set(['index', 'user', 'profile', uid], getProfileSearchIndices(profile)))
}

export function getGravatarHash(email) {
  return CryptoJS.MD5(email.trim().toLowerCase()).toString()
}

export const storeUser = ({read, set}, {uid, email, profile}) => {
  const gravatarHash = getGravatarHash(email)
  return Promise.all([
    set(['user', 'profile', uid], {...profile, email, gravatarHash}),
    set(['user', 'role', uid], {
      type: 'user',
      blocked: false,
      created: Firebase.ServerValue.TIMESTAMP
    })
  ])
  .then(() => updateSearchIndices({read, set}, uid))
  .then(() => null)
}
