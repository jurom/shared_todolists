import {fromJS, OrderedSet} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  search: {
    search: '',
    friendIds: {
      email: new OrderedSet(),
      firstLast: new OrderedSet(),
      lastFirst: new OrderedSet(),
    },
  },
  friendIds: new OrderedSet(),
  requests: {
    sent: {},
    received: {},
  },
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onSearchedFriendIds]: ([searchBy, ids]) => {
      return state.setIn(['search', 'friendIds', searchBy], new OrderedSet(ids))
    },
    [actions.search]: (search) => {
      return state.setIn(['search', 'search'], search)
    },
    [actions.onFriendIds]: (friendIds) => {
      return state.set('friendIds', new OrderedSet(friendIds))
    },
    [actions.onFriendRequests]: ([key, requests]) => {
      return state.setIn(['requests', key], fromJS(requests))
    }
  }[action] || (() => state))(payload)
}
