import React from 'react'
import {Component} from 'vlux'
import {Thumbnail, Button, Row, Col} from 'react-bootstrap'
import {gravatarSrc} from '../helpers/gravatar'
import {wasSentRequest, isFriend, wasRequestedBy} from './helpers'

export class Friend extends Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    friends: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  renderCustomComponent() {
    const {user, friends, actions} = this.props
    if (isFriend(user, friends)) {
      return (
        <Button
          bsStyle="primary"
          onClick={() => this.context.router.push(`/detail/${user.get('id')}`)}
        >View profile</Button>
      )
    } else if (wasRequestedBy(user, friends)) {
      return (
        <Row>
          <Col md={6}>
            <Button
              bsStyle="success"
              onClick={() => actions.acceptRequest(user)}
            >Accept</Button>
          </Col>
          <Col md={6}>
            <Button
              bsStyle="danger"
              onClick={() => actions.rejectRequest(user)}
            >Reject</Button>
          </Col>
        </Row>
      )
    } else if (wasSentRequest(user, friends)) {
      return (
        <Button
          bsStyle="danger"
          onClick={() => actions.cancelRequest(user)}
        >Cancel request</Button>
      )
    } else {
      return (
        <Button
          bsStyle="primary"
          onClick={() => actions.sendRequest(user)}
        >Add user</Button>
      )
    }
  }

  render() {
    const {user: {profile: {firstName, lastName, gravatarHash, email}}} = this.props
    return (
      <Thumbnail src={gravatarSrc({hash: gravatarHash, size: '400x400'})} alt="">
        <h3>{firstName}<br />{lastName}</h3>
        <small>{email}</small>
        {this.renderCustomComponent()}
      </Thumbnail>
    )
  }
}
