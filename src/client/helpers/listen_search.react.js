import React from 'react'
import {Component} from 'vlux'
import {listenFirebase} from '../helpers/listen_firebase.react'
import {encodeSearch} from '../../common/auth_actions'

const listenOnFriendBy = (searchBy) => listenFirebase(
  (props) => props.firebase.child(`index/user/profile`)
    .orderByChild(searchBy)
    .startAt(encodeSearch(props.search))
    .endAt(encodeSearch(props.search) + 'a')
    .limitToFirst(8),
  (e, props, data) => props.setSearchedIds(searchBy, Object.keys(data.val() || {}))
)

export class ListenSearchedUsers extends Component {

  static propTypes = {
    search: React.PropTypes.string.isRequired,
    firebase: React.PropTypes.object.isRequired,
    setSearchedIds: React.PropTypes.func.isRequired,
  }

  shouldSearch() {
    const {search} = this.props
    return search.length >= 1
  }

  render() {
    const ListenEmails = listenOnFriendBy('email')
    const ListenFirstLast = listenOnFriendBy('firstLast')
    const ListenLastFirst = listenOnFriendBy('lastFirst')

    const {search, firebase, setSearchedIds} = this.props

    return (
      <div>
        {this.shouldSearch() && <ListenEmails {...{firebase, setSearchedIds, search}} />}
        {this.shouldSearch() && <ListenFirstLast {...{firebase, setSearchedIds, search}} />}
        {this.shouldSearch() && <ListenLastFirst {...{firebase, setSearchedIds, search}} />}
      </div>
    )

  }
}
