import React from 'react'
import {Component} from 'vlux'
import {listenFirebase} from '../helpers/listen_firebase.react'
import {actions} from './actions'
import {getUserIdsToListen} from './store'
import {ListenUsers} from '../user/listen_user.react'
import {encodeSearch} from '../../common/auth_actions'

const listenOnFriendBy = (searchBy) => listenFirebase(
  (props) => props.firebase.child(`index/user/profile`)
    .orderByChild(searchBy)
    .startAt(encodeSearch(props.search))
    .endAt(encodeSearch(props.search) + 'a')
    .limitToFirst(8),
  (e, props, data) => props.dispatch(actions.onSearchedFriendIds, [searchBy, Object.keys(data.val() || {})])
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
    return search.length >= 1
  }

  render() {
    const ListenEmails = listenOnFriendBy('email')
    const ListenFirstLast = listenOnFriendBy('firstLast')
    const ListenLastFirst = listenOnFriendBy('lastFirst')

    const {search, firebase, dispatch, friendIds} = this.props

    return (
      <div>
        {this.shouldSearch() && <ListenEmails {...{firebase, dispatch, search}} />}
        {this.shouldSearch() && <ListenFirstLast {...{firebase, dispatch, search}} />}
        {this.shouldSearch() && <ListenLastFirst {...{firebase, dispatch, search}} />}
        <ListenUsers ids={getUserIdsToListen(friendIds)} {...{firebase, dispatch}} />
      </div>
    )

  }
}
