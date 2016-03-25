import React from 'react'
import {Component} from 'vlux'
import {isLoaded} from '../user/helpers'
import {Row, Col} from 'react-bootstrap'
import {Friend} from './friend.react'
import {requireLoad} from '../helpers/require_load.react'


@requireLoad((props) => props.friends.getIn(['requests', 'received']) != null)
export class Requests extends Component {

  static propTypes = {
    friends: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  render() {

    const {friends, friends: {requests: {received}}, users, actions: {friends: actions}} = this.props

    const usersToShow = received.valueSeq()
      .map(({requestingUserId}) => users.get(requestingUserId))
      .filter(isLoaded)
    return (
      <Row>
        {usersToShow.map((user) =>
          <Col md={3}>
            <Friend {...{user, friends, actions}} />
          </Col>
        )}
      </Row>
    )
  }
}
