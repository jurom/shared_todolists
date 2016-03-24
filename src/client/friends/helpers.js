export function getFriendIdsToListen(friends) {
  return friends.getIn(['search', 'friendIds'])
    .reduce((total, ids) => total.union(ids))
    .union(friends.get('friendIds'))
}

export function canSendRequest(friend, requests) {
  const {id} = friend
  return !requests.get('sent').has(id)
}
