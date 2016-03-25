import {fromJS} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  myTasks: {
    editedTask: null,
  }
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.editTask]: (task) => {
      return state.setIn(['myTasks', 'editedTask'], fromJS(task))
    },
    [actions.setEditedTaskData]: ([keyPath, data]) => {
      return state.setIn(['myTasks', 'editedTask', ...keyPath], fromJS(data))
    },
  }[action] || (() => state))(payload)
}
