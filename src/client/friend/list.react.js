import React from 'react'
import {Component} from 'vlux'
import {isLoaded} from '../user/helpers'
import {Row, Col} from 'react-bootstrap'
import {Friend} from './friend.react'

export class FriendList extends Component {

  static propTypes = {
    friends: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
  }

  render() {
    const {friends, actions, users, friends: {friendIds}} = this.props

    const usersToShow = friendIds
      .map((id) => users.get(id))
      .filter(isLoaded)

    return (
      <Row>
        {usersToShow.map((user) =>
          <Col md={3}>
            <Friend {...{user, actions, friends}} />
          </Col>)}
      </Row>
    )
  }
}
