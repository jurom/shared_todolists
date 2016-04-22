import {createActions} from '../vlux'
import {initialTaskState} from '../task/helpers'
import {fromJS} from 'immutable'

export const actions = createActions('friends', [
  'search',
  'onSearchedFriendIds',
  'onFriendIds',
  'onFriendRequests',
  'editTask',
  'setEditedTaskData',
  'setTaskFilter',
])

export function create(dispatch, router, firebase, getState, submitTransaction) {
  return {

    sendRequest(user) {
      const {auth: {uid}} = getState()
      return submitTransaction('sendRequest', {
        uid,
        requestedUserId: user.get('id')
      })
    },

    cancelRequest(user) {
      const {auth: {uid}} = getState()
      return submitTransaction('cancelRequest', {
        uid,
        requestedUserId: user.get('id')
      })
    },

    acceptRequest(user) {
      const {auth: {uid}} = getState()
      return submitTransaction('acceptRequest', {
        uid,
        requestingUserId: user.get('id')
      })
    },

    rejectRequest(user) {
      const {auth: {uid}} = getState()
      return submitTransaction('rejectRequest', {
        uid,
        requestingUserId: user.get('id')
      })
    },

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
