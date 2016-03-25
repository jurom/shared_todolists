import {OrderedSet, fromJS} from 'immutable'

export function getSearchedFriendsIds(friends) {
  return friends.getIn(['search', 'friendIds'])
    .reduce((total, ids) => total.union(ids || (new OrderedSet())), new OrderedSet())
}

export function getFriendIdsToListen(friends) {
  return getSearchedFriendsIds(friends)
    .union(friends.get('friendIds') || (new OrderedSet()))
    .union((friends.getIn(['requests', 'received']) ||  fromJS({})).keySeq())
}

export function isFriend(user, friends) {
  return friends.get('friendIds').has(user.get('id'))
}

export function wasRequestedBy(user, friends) {
  return friends.getIn(['requests', 'received']).has(user.get('id'))
}

export function wasSentRequest(user, friends) {
  return friends.getIn(['requests', 'sent']).has(user.get('id'))
}
