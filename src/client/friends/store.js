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
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onSearchedFriendIds]: ([searchBy, ids]) => {
      return state.setIn(['search', 'friendIds', searchBy], new OrderedSet(ids))
    },
    [actions.search]: (search) => {
      return state.setIn(['search', 'search'], search)
    }
  }[action] || (() => state))(payload)
}
