import {transactor} from '../../firebase-transactions/src/transactor'
import {sendRequest, acceptRequest, cancelRequest, rejectRequest} from './friend_request'
import {registerUser} from './register_user'
import {fromJS} from 'immutable'

function withUnpackedCredentials(handler, requireAuth) {
  return (transactorOps, data) => {
    const {abort} = transactorOps
    const {uid = null} = data
    if (requireAuth && !uid) {
      return abort('Auth required but uid not provided')
    } else {
      return handler(transactorOps, data, uid)
    }
  }
}

export function startTransactor(firebase) {

  const friendRequest = fromJS({sendRequest, acceptRequest, cancelRequest, rejectRequest})
    .map((v) => withUnpackedCredentials(v, true))
    .toJS()

  const handlers = {
    ...friendRequest,
    registerUser: withUnpackedCredentials(registerUser, true),
  }

  transactor(firebase, handlers, {todoTrxRef: firebase.child('new_transaction')})
}
