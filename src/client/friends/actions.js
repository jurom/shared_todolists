import {createActions} from '../vlux'

export const actions = createActions('friends', [
  'search',
  'onSearchedFriendIds',
  'onFriendIds',
  'onFriendRequests',
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
    }

  }
}
