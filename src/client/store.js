import dashboard from './dashboard/store'

import {fromJS} from 'immutable'

const initialState = fromJS({})

export default function store(state = initialState, action, payload) {
  state = state.update('dashboard', (s) => dashboard(s, action, payload))
  return state
}
