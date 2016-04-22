import {fromJS} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  myTasks: {
    editedTask: null,
    filter: 'open',
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
    [actions.setTaskFilter]: (filterName) => {
      return state.setIn(['myTasks', 'filter'], filterName)
    },
  }[action] || (() => state))(payload)
}
