import {fromJS} from 'immutable'

export function isDone(task) {
  return task.get('status') === 'done'
}

export function isDeleted(task) {
  return task.get('status') === 'wontdo'
}

export function taskStyle(task) {
  return isDone(task) ?
      'success'
    :
      isDeleted(task) ? 'danger' : 'primary'
}

export function isEditable(task) {
  return !isDone(task) && !isDeleted(task)
}

export const initialTaskState = fromJS({
  header: '',
  content: '',
  fromUser: null,
  toUser: null,
  status: 'open',
})

export function getUserTasks(tasks, userId) {
  return tasks.get(userId, fromJS({})).flatten(true)
}
