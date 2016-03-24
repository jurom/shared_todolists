import React from 'react'
import {Component} from 'vlux'
import {Row, Col, Input, Thumbnail, Button} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {ListenFriends} from './listen_search.react'
import {getFriendIdsToListen, canSendRequest} from './helpers'
import {isLoaded} from '../user/helpers'
import {gravatarSrc} from '../helpers/gravatar'
import {requireAuth} from '../auth/require_registration_state.react.js'

@requireAuth
export class FindFriends extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    friends: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    firebase: React.PropTypes.object.isRequired,
  }

  renderUser(user, requests, actions) {
    const {profile: {firstName, lastName, gravatarHash}} = user
    return (
      <Thumbnail src={gravatarSrc({hash: gravatarHash})} alt="">
        <h3>{firstName}<br />{lastName}</h3>
        <small>{user.getIn(['profile', 'email'])}</small>
        {canSendRequest(user, requests) ?
          <Button
            bsStyle="primary"
            onClick={() => actions.sendRequest(user)}
          >Add friend</Button>
        :
          <Button
            bsStyle="danger"
            onClick={() => actions.cancelRequest(user)}
          >Cancel friend request</Button>
        }
      </Thumbnail>
    )
  }

  render() {

    const {users, friends, friends: {search: {search}, requests}, dispatch, firebase} = this.props
    const {actions: {friends: actions}} = this.props

    const searchedUsers = getFriendIdsToListen(friends)
      .map((id) => users.get(id))
      .filter(isLoaded)

    return (
      <div>
        <ListenFriends {...{search, dispatch, firebase}} />
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
              {this.renderUser(user, requests, actions)}
            </Col>)}
        </Row>
      </div>
    )
  }
}
