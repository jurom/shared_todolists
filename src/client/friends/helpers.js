export function getFriendIdsToListen(friends) {
  return friends.getIn(['search', 'friendIds']).reduce((total, ids) => total.union(ids))
}
