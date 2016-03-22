import {fromJS, OrderedSet} from 'immutable'
import {actions} from './actions'

export function getUserIdsToListen(friendIds) {
  return friendIds.reduce((total, ids) => total.union(ids))
}

const initialState = fromJS({
  friendIds: {
    email: new OrderedSet(),
    firstName: new OrderedSet(),
    lastName: new OrderedSet(),
  },
  search: '',
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onFriendIds]: ([searchBy, ids]) => {
      return state.setIn(['friendIds', searchBy], new OrderedSet(ids))
    },
    [actions.search]: (search) => {
      return state.set('search', search)
    }
  }[action] || (() => state))(payload)
}
