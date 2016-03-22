import {fromJS} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  show: false
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.toggleShow]: (show) => {
      return state.set('show', show)
    }
  }[action] || (() => state))(payload)
}
