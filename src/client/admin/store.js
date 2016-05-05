import {fromJS, OrderedSet} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  page: 1,
  pageSize: 10,
  userIds: [],
  search: {
    value: '',
    userIds: {
      email: null,
      firstLast: null,
      lastFirst: null,
    },
  },
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onUserIds]: (ids) => {
      return state.set('userIds', fromJS(ids))
    },
    [actions.setPage]: (page) => {
      return state.set('page', page)
    },
    [actions.setSearch]: (value) => {
      return state.setIn(['search', 'value'], value)
    },
    [actions.setSearchedIds]: ([searchBy, ids]) => {
      return state.setIn(['search', 'userIds', searchBy], new OrderedSet(ids))
    },
  }[action] || (() => state))(payload)
}
