import {fromJS, Map} from 'immutable'
import {actions} from './actions'

const initEmpty = (...fields) => {
  return Map(fields.map((field) => [field, '']))
}

const getDefaultValidity = (...fields) => {
  return Map(fields.map((field) => [field, {
    valid: null,
    error: null,
    showValidation: false
  }]))
}

const initFields = (...fields) => {
  return fromJS({
    fields: initEmpty(...fields),
    validation: getDefaultValidity(...fields)
  })
}

const initialState = fromJS({
  uid: null,
  login: initFields('email', 'password'),
  signup: initFields('email', 'password', 'firstName', 'lastName'),
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.set]: ([keyPath, value]) => {
      return state.setIn(keyPath, fromJS(value))
    },
    [actions.authUid]: (uid) => {
      return state.set('uid', uid)
    },
    [actions.validation]: ([keyPath, validity]) => {
      return state.mergeIn(keyPath, fromJS(validity))
    },
  }[action] || (() => state))(payload)
}
