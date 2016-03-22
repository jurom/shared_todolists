import React from 'react'
import {Component} from 'vlux'
import {listenFirebase} from '../helpers/listen_firebase.react'
import {actions} from './actions'
import {getUserIdsToListen} from './store'
import {ListenUsers} from '../user/listen_user.react'
import {nextString} from '../../common/useful'

const listenOnFriendBy = (searchBy) => listenFirebase(
  (props) => props.firebase.child(`user/profile`)
    .orderByChild(searchBy)
    .startAt(props.search)
    .endAt(nextString(props.search))
    .limitToFirst(8),
  (e, props, data) => props.dispatch(actions.onFriendIds, [searchBy, Object.keys(data.val() || {})])
)

export class ListenFriends extends Component {

  static propTypes = {
    search: React.PropTypes.string.isRequired,
    firebase: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    friendIds: React.PropTypes.object.isRequired,
  }

  shouldSearch() {
    const {search} = this.props
    return search.length >= 3
  }

  render() {
    const ListenEmails = listenOnFriendBy('email')
    const ListenFirstNames = listenOnFriendBy('firstName')
    const ListenLastNames = listenOnFriendBy('lastName')

    const {search, firebase, dispatch, friendIds} = this.props

    return (
      <div>
        {this.shouldSearch() && <ListenEmails {...{firebase, dispatch, search}} />}
        {this.shouldSearch() && <ListenFirstNames {...{firebase, dispatch, search}} />}
        {this.shouldSearch() && <ListenLastNames {...{firebase, dispatch, search}} />}
        <ListenUsers ids={getUserIdsToListen(friendIds)} {...{firebase, dispatch}} />
      </div>
    )

  }
}
