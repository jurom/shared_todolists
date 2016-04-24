import {fromJS} from 'immutable'

export function getActiveIds(userIds, page, pageSize) {
  return userIds == null ? fromJS([]) : userIds.skip((page - 1) * pageSize).take(pageSize)
}
