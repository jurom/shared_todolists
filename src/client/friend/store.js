import {fromJS, OrderedSet} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  search: {
    search: '',
    friendIds: {
      email: null,
      firstLast: null,
      lastFirst: null,
    },
  },
  friendIds: null,
  requests: {
    sent: null,
    received: null,
  },
  task: {
    editedTask: null,
    filter: 'open',
  }
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
    },
    [actions.editTask]: (task) => {
      return state.setIn(['task', 'editedTask'], fromJS(task))
    },
    [actions.setEditedTaskData]: ([keyPath, value]) => {
      return state.setIn(['task', 'editedTask', ...keyPath], value)
    },
    [actions.setTaskFilter]: (filterName) => {
      return state.setIn(['task', 'filter'], filterName)
    },
  }[action] || (() => state))(payload)
}
