import {fromJS, OrderedSet} from 'immutable'

export function getActiveIds(userIds, page, pageSize) {
  return userIds == null ? fromJS([]) : userIds.skip((page - 1) * pageSize).take(pageSize)
}

export function getSearchedUserIds(userIds) {
  return userIds.reduce((total, ids) => total.union(ids || (new OrderedSet())), new OrderedSet())
}
