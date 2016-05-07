import {storeUser} from '../../common/auth_actions'

export function registerUser({read, set, abort}, data, uid) {
  return storeUser({read, set}, {uid: data.uid, profile: data.profile, email: data.email})
    .then(() => console.log('stored'))
    .then(() => null)
}
