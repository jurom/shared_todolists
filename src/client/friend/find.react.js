import React from 'react'
import {Component} from 'vlux'
import {Row, Col, FormControl, FormGroup} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {ListenFriends} from './listen_search.react'
import {getSearchedFriendsIds} from './helpers'
import {isLoaded} from '../user/helpers'
import {requireAuth} from '../auth/require_registration_state.react.js'
import {Friend} from './friend.react'

@requireAuth
export class FindFriends extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    friends: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    firebase: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  }

  render() {

    const {users, friends, friends: {search: {search}}, dispatch, firebase, user} = this.props
    const {actions: {friends: actions}} = this.props

    const searchedUsers = getSearchedFriendsIds(friends)
      .filter((id) => user.get('id') !== id)
      .map((id) => users.get(id))
      .filter(isLoaded)

    return (
      <div>
        <ListenFriends {...{search, dispatch, firebase}} />
        <Row>
          <Col md={6} >
            <FormGroup controlId="searchFriends">
              <FormControl
                type="text"
                onChange={(e) => dispatch(actionNames.search, e.target.value)}
                value={search}
                placeholder={'Enter friend\'s name'}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          {searchedUsers.map((user) =>
            <Col md={3} key={user.get('id')}>
              <Friend {...{user, friends, actions}} />
            </Col>)}
        </Row>
      </div>
    )
  }
}
