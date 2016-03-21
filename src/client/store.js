import dashboard from './dashboard/store'
import auth from './auth/store'

import {fromJS} from 'immutable'

const initialState = fromJS({})

const globalStore = (state = initialState, action, payload) => {
  return ({
    clearState: (whiteList) => {
      return state.filter((v, k) => whiteList.indexOf(k) !== -1)
    }
  }[action] || (() => state))(payload)
}

export default function store(state = initialState, action, payload) {
  state = state.update((s) => globalStore(s, action, payload))
  state = state.update('auth', (s) => auth(s, action, payload))
  state = state.update('dashboard', (s) => dashboard(s, action, payload))
  return state
}