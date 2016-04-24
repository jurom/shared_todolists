import {fromJS} from 'immutable'
import {actions} from './actions'

const initialState = fromJS({
  page: 1,
  pageSize: 10,
  userIds: null,
})

export default function store(state = initialState, action, payload) {
  return ({
    [actions.onUserIds]: (ids) => {
      return state.set('userIds', fromJS(ids))
    },
    [actions.setPage]: (page) => {
      return state.set('page', page)
    },
  }[action] || (() => state))(payload)
}
