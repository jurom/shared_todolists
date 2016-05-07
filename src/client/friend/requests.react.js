import React from 'react'
import {Component} from 'vlux'
import {isLoaded} from '../user/helpers'
import {Row, Col} from 'react-bootstrap'
import {Friend} from './friend.react'
import {requireLoad} from '../helpers/require_load.react'


@requireLoad(({friends: {requests: {received = null, sent = null}}}) => (sent != null) && (received != null))
export class Requests extends Component {

  static propTypes = {
    friends: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  render() {

    const {friends, friends: {requests: {received, sent}}, users, actions: {friends: actions}} = this.props

    const usersToShow = received
      .map(({requestingUserId}) => users.get(requestingUserId))
      .merge(
        sent.map(({requestedUserId}) => users.get(requestedUserId))
      )
      .filter(isLoaded)
      .valueSeq()
    return (
      <Row>
        {usersToShow.map((user) =>
          <Col md={3} xs={6} sm={4}>
            <Friend {...{user, friends, actions}} />
          </Col>
        )}
      </Row>
    )
  }
}
