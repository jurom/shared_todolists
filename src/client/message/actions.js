import {createActions} from '../vlux'
import {read, push} from '../../common/firebase_actions'
import Firebase from 'firebase'

export const actions = createActions('message', [
  'onNewMessage',
  'onInitialMessages',
  'setCurrentMessage',
])

export function create(dispatch, router, firebase, getState, submitTransaction) {
  return {
    loadMessages(friendId) {
      const userId = getState().getIn(['auth', 'uid'])
      return Promise.all([
        read(firebase.child(`message/${userId}/${friendId}`)),
        read(firebase.child(`message/${friendId}/${userId}`))
      ]).then(([outMessages, inMessages]) => dispatch(actions.onInitialMessages, {
        friendId,
        outMessages,
        inMessages
      }))
    },

    sendMessage(friendId, content) {
      const userId = getState().getIn(['auth', 'uid'])
      push(firebase.child(`message/${userId}/${friendId}`), {
        content,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        author: userId,
        belongsTo: friendId
      })
      dispatch(actions.setCurrentMessage, [friendId, ''])
    },

    setCurrentMessage(friendId, message) {
      dispatch(actions.setCurrentMessage, [friendId, message])
    },

    onNewMessage({conversationId, message, key}) {
      const conversationLoaded = (getState().getIn(['messages', conversationId, 'messages']) != null)
      if (conversationLoaded) {
        dispatch(actions.onNewMessage, {conversationId, message, key})
      }
    }
  }
}
