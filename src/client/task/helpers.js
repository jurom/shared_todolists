import {fromJS} from 'immutable'

export function isCompleted(task) {
  return task.get('status') === 'completed'
}

export function isDeleted(task) {
  return task.get('status') === 'deleted'
}

export function taskStyle(task) {
  return isCompleted(task) ?
      'success'
    :
      isDeleted(task) ? 'danger' : 'primary'
}

export const initialTaskState = fromJS({
  header: '',
  content: '',
  fromUser: null,
  toUser: null,
  status: 'open',
})

export function getFriendTasks(tasks, friendId) {
  return tasks.get(friendId).flatten(true)
}
