import React from 'react'
import {Component} from 'vlux'
import {gravatarSrc} from '../helpers/gravatar'
import {getName, isLoaded} from './helpers'
import {Row, Col, Image} from 'react-bootstrap'
import {requireLoad} from '../helpers/require_load.react'

@requireLoad((props) => isLoaded(props.user))
export class UserProfile extends Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  render() {

    const {user, user: {profile: {email, gravatarHash}}} = this.props
    return (
      <div>
        <Row>
          <Col md={12}>
            <Image src={gravatarSrc({hash: gravatarHash, size: '400x400'})} rounded responsive />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>{getName(user)}</h2> <br />
            {email}
          </Col>
        </Row>
      </div>
    )
  }
}
