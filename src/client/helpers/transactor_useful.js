import {read, push, set, update, change} from '../../common/firebase_actions'

export function transactorOps(firebase) {
  return {
    read: (path) => read(firebase.child(path.join('/'))),
    push: (path, value) => push(firebase.child(path.join('/')), value),
    set: (path, value) => set(firebase.child(path.join('/')), value),
    update: (path, value) => update(firebase.child(path.join('/')), value),
    change: (path, fn) => change(firebase.child(path.join('/')), fn),
    getId: () => push(firebase).key(),
    abort: (msg) => null,
  }
}
