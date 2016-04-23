import {fromJS, OrderedMap} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({})

/*
  The state consists of friendIds, and each friendId has the structure:
  [friendId]: {
    messages: {
      [id]: {...}
    },
    currentMessage: ""
  }
*/

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onNewMessage]: ({conversationId, message, key}) => {
      return state.setIn([conversationId, 'messages', key], fromJS(message))
    },
    [actions.onInitialMessages]: ({friendId, inMessages, outMessages}) => {
      return state.setIn([friendId, 'messages'], (new OrderedMap(inMessages))
        .merge(new OrderedMap(outMessages))
        .sortBy(({timestamp}) => timestamp)
      )
    },
    [actions.setCurrentMessage]: ([friendId, message]) => {
      return state.setIn([friendId, 'currentMessage'], message)
    }
  }[action] || (() => state))(payload)
}
