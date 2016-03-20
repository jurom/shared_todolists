import {Dispatcher} from 'vlux'
import store from './store'
import {jsify} from '../common/useful.js'

export const dispatcher = new Dispatcher(store)
export const dispatch = (action, payload) => {
  console.log('Dispatching action: ', action) // eslint-disable-line no-console
  console.log('Payload: ', jsify(payload)) // eslint-disable-line no-console
  if (typeof action !== 'string') {
    throw new Error(`dispatcher: action to be dispatched must be string! (action = ${action})`)
  }
  dispatcher.dispatch(action, payload)
  console.log('State after dispatch: ', jsify(dispatcher.state)) // eslint-disable-line no-console
  console.log('--------') // eslint-disable-line no-console
}
