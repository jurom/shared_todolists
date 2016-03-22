import {fromJS} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onProfile]: ([id, profile]) => {
      return state
        .setIn([id, 'profile'], fromJS(profile))
        .setIn([id, 'id'], id)
    },

    [actions.onRole]: ([id, role]) => {
      return state.setIn([id, 'role'], fromJS(role))
    }
  }[action] || (() => state))(payload)
}
