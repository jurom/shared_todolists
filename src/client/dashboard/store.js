import {fromJS} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  res: 'no'
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.test]: (res) => {
      return state.set('res', res)
    }
  }[action] || (() => state))(payload)
}
