import {fromJS} from 'immutable'
import {createActions} from '../vlux'
import {initialTaskState} from '../task/helpers'

export const actions = createActions('dashboard', [
  'editTask',
  'setEditedTaskData',
  'setTaskFilter',
])

export function create(dispatch, router, firebase, getState) {
  return {
    addTask(fromUser, toUser) {
      const id = firebase.push().key()
      const task = initialTaskState.merge(fromJS({id, fromUser, toUser})).toJS()
      dispatch(actions.editTask, task)
    },

    editTask(task, id) {
      dispatch(actions.editTask, {...task.toJS(), id})
    }
  }
}
