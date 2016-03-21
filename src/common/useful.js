import {fromJS} from 'immutable'
import {Promise} from 'bluebird'

export function promisify(callback) {
  return new Promise((resolve, reject) => {
    // On failure, the first argument will be an Error object indicating the
    // failure, with a machine-readable code attribute. On success, the first
    // argument will be null and the second can be an object containing result.
    callback((error, data) => {
      if (error) {
        reject(error)
        return
      }
      resolve(data)
    })
  })
}

export function jsify(obj) {
  if (obj == null) {
    return null
  } else if (typeof obj === 'object') {
    return fromJS(obj).toJS()
  } else {
    return obj
  }
}
