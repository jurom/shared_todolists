import {fromJS} from 'immutable'

export function jsify(obj) {
  if (obj == null) {
    return null
  } else if (typeof obj === 'object') {
    return fromJS(obj).toJS()
  } else {
    return obj
  }
}
