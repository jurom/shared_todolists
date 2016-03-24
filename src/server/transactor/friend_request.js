import Firebase from 'firebase'

export function sendRequest({read, set, abort}, data, uid) {
  const {requestedUserId = null} = data
  if (!requestedUserId) return abort(`No user to send the invitation to`)
  return read(['friend', 'request', 'sent', uid, requestedUserId])
    .then((existingRequest) => {
      if (existingRequest != null) abort(`Invitation from ${uid} to ${requestedUserId} already exists`)
      // Request in received does not exist too, because they are created and deleted simulateneosly
      // only by server
      const request = {
        requestedUserId,
        requestingUserId: uid,
        timestamp: Firebase.ServerValue.TIMESTAMP
      }
      return Promise.all([
        set(['friend', 'request', 'sent', uid, requestedUserId], request),
        set(['friend', 'request', 'received', requestedUserId, uid], request)
      ])
    })
}

export function acceptRequest({read, set, abort, push}, data, uid) {
  const {requestingUserId = null} = data
  if (!requestingUserId) return abort(`No requestingUserId present`)
  return read(['friend', 'request', 'received', uid, requestingUserId])
    .then((request) => {
      if (!request) return abort(`No friend request from user ${requestingUserId} to user ${uid}`)
      // Everything is alright
      return Promise.all([
        set(['friend', 'list', uid, requestingUserId], {
          createdAt: Firebase.ServerValue.TIMESTAMP
        }),
        set(['friend', 'list', requestingUserId, uid], {
          createdAt: Firebase.ServerValue.TIMESTAMP
        })
      ]).then(() => Promise.all([
        set(['friend', 'request', 'sent', requestingUserId, uid], null),
        set(['friend', 'request', 'received', uid, requestingUserId], null)
      ]))
    })
}

function deleteRequest({set, abort}, data) {
  const {requestingUserId = null, requestedUserId = null} = data
  if (!requestingUserId || !requestedUserId) {
    return abort(`Requesting userId (${requestingUserId}) or requested userId (${requestedUserId}) not defined`)
  }
  return Promise.all([
    set(['friend', 'request', 'sent', requestingUserId, requestedUserId], null),
    set(['friend', 'request', 'received', requestedUserId, requestingUserId], null)
  ])
}

export function cancelRequest({read, set, abort}, data, uid) {
  const {requestedUserId = null} = data
  if (!requestedUserId) return abort(`Requested userId is not present`)
  return read(['friend', 'request', 'sent', uid, requestedUserId])
    .then((request) => {
      if (!request) return abort(`There is no friend request from ${uid} to ${requestedUserId}`)
      return deleteRequest({set, abort}, {requestingUserId: uid, requestedUserId})
    })
}

export function rejectRequest({read, set, abort}, data, uid) {
  const {requestingUserId = null} = data
  if (!requestingUserId) return abort('Requesting userId is not present')
  return read(['friend', 'request', 'received', uid, requestingUserId])
    .then((request) => {
      if (!request) return abort(`There is no friend request from ${requestingUserId} to ${uid}`)
      return deleteRequest({set, abort}, {requestingUserId, requestedUserId: uid})
    })
}
