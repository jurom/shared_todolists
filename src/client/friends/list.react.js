import React from 'react'
import {Component} from 'vlux'
import {Row, Col, Input, Thumbnail} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {ListenFriends} from './listen_search.react'
import {getUserIdsToListen} from './store'
import {isLoaded, getName} from '../user/helpers'

export class FriendList extends Component {

  static propTypes = {
    users: React.PropTypes.object.isRequired,
    friends: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    firebase: React.PropTypes.object.isRequired,
  }

  renderUser(user) {
    // TODO: Make tis somehow user dependent .. (gravatar based on email?)
    return (
      <Thumbnail src="http://www.gravatar.com/avatar" alt="">
        <h3>{getName(user)}</h3>
        <small>{user.getIn(['profile', 'email'])}</small>
      </Thumbnail>
    )
  }

  render() {

    const {users, friends: {search, friendIds}, dispatch, firebase} = this.props

    const searchedUsers = getUserIdsToListen(friendIds)
      .map((id) => users.get(id))
      .filter(isLoaded)

    return (
      <div>
        <ListenFriends {...{search, friendIds, dispatch, firebase}} />
        <Row>
          <Col md={6} >
            <Input
              type="text"
              onChange={(e) => dispatch(actionNames.search, e.target.value)}
              value={search}
              placeholder={'Search for user'}
            />
          </Col>
        </Row>
        <Row>
          {searchedUsers.map((user) =>
            <Col md={3} key={user.get('id')}>
              {this.renderUser(user)}
            </Col>)}
        </Row>
      </div>
    )
  }
}
