/* eslint-disable camelcase*/
/* eslint-disable no-console*/

import {Iterable, List} from 'immutable'

function safeString(o) {
  let stro = 'String representation of object cannot be computed'
  try {
    stro = `${o}`
  } catch (e) {}
  return stro
}

function stringKeys(obj) {
  let ks
  if (Iterable.isIterable(obj)) {
    ks = List(obj.keys()).toJS()
  } else {
    ks = Object.keys(obj)
  }
  ks = ks.map((k) => `"${k}"`)
  return `[ ${ks.join(', ')} ]`
}

function type(o) {
  return `[${typeof o}]`
}

function safe(o, k, d) {
  if (Iterable.isIterable(o)) {
    let res = o.get(k, d)
    if (res === undefined) {
      console.trace(`Key Error: object with keys ${stringKeys(o)} does not contain property ${k}`)
      return
    }
    return o.get(k, d)
  }
  if (typeof k !== 'string') {
    console.trace(`cannot resolve non-string property ${type(k)} ${safeString(k)}`)
    return
  }
  if (typeof o !== 'object') {
    console.trace(`cannot resolve property ${k} in object of type ${typeof o} (${safeString(o)})`)
    return
  }
  if (k in o) {
    return o[k]
  }
  if (d === undefined) {
    console.trace(`Key Error: object with keys ${stringKeys(o)} does not contain property ${k}`)
    return
  }
  return d
}

if (typeof global === 'object') {
  global.__extensible_get__ = safe
}
if (typeof window === 'object') {
  window.__extensible_get__ = safe
}
