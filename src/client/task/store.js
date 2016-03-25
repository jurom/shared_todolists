import {fromJS} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onMyTasks]: ([myId, tasks]) => {
      return state.set(myId, fromJS(tasks))
    },
    [actions.onFriendTasks]: ([friendId, myId, tasks]) => {
      return state.setIn([friendId, myId], fromJS(tasks))
    },
  }[action] || (() => state))(payload)
}
