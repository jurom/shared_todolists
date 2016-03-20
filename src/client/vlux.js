import {Map} from 'immutable'

export const createActions = (namespace, actions) => {
  return Map(actions.map((action) => [action, `${namespace}/${action}`])).toJS()
}
