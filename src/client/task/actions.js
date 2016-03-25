import {createActions} from '../vlux'
import {set, update} from '../../common/firebase_actions'

export const actions = createActions('task', [
  'onMyTasks',
  'onFriendTasks',
  'setEditedTask',
])

export function create(dispatch, router, firebase, getState, submitTransaction) {
  return {

    deleteTask(task, id) {
      const {fromUser, toUser} = task
      return set(firebase.child(`task/${toUser}/${fromUser}/${id}/status`), 'deleted')
    },

    completeTask(task, id) {
      const {fromUser, toUser} = task
      return set(firebase.child(`task/${toUser}/${fromUser}/${id}/status`), 'completed')
    },

    submitTask(task) {
      const {fromUser, toUser, id} = task
      return update(firebase.child(`task/${toUser}/${fromUser}/${id}`), task.toJS())
    }
  }
}
