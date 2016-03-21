import {fromJS, Map} from 'immutable'
import {actions} from './actions'

const initEmpty = (...fields) => {
  return Map(fromJS(fields).map((field) => [field]))
}

const initialState = fromJS({
  uid: null,
  login: initEmpty('email', 'password'),
  signup: initEmpty('email', 'password', 'firstName', 'lastName'),
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.set]: ([keyPath, value]) => {
      return state.setIn(keyPath, value)
    },
    [actions.authUid]: (uid) => {
      return state.set('uid', uid)
    }
  }[action] || (() => state))(payload)
}
