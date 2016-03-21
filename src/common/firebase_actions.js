import {Promise} from 'bluebird'
import {promisify} from './useful'

export function toJS(value) {
  return (value && value.toJS) ? value.toJS() : value
}

function _change(ref, method, value) {
  return promisify((c) => ref[method](toJS(value), c))
}
export function set(ref, value) {return _change(ref, 'set', value) }
export function update(ref, value) {return _change(ref, 'update', value) }
export function remove(ref) {return promisify((c) => ref.remove(c)) }

export function push(ref, value, onComplete) {return ref.push(toJS(value), onComplete) }

export function read(ref) {
  return new Promise(
    (resolve, reject) => ref.once('value', (snap) => {resolve(snap.val())}, reject))
}

export function createUser(ref, credentials) {
  return promisify((c) => ref.createUser(toJS(credentials), c))
}

export function removeUser(ref, credentials) {
  return promisify((c) => ref.removeUser(toJS(credentials), c))
}

export function authWithPassword(ref, credentials, options) {
  return promisify((c) => ref.authWithPassword(toJS(credentials), c, toJS(options)))
}
