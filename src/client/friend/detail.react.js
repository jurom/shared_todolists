import React from 'react'
import {Component} from 'vlux'
import {Row, Col, Grid, Image} from 'react-bootstrap'
import {requireLoad} from '../helpers/require_load.react'
import {requirePermission} from '../helpers/require_permission.react'
import {isLoaded, getName} from '../user/helpers'
import {Loading} from '../helpers/loading.react'
import {gravatarSrc} from '../helpers/gravatar'

function hasFriend(props) {
  return props.friends.get('friendIds').contains(props.params.id)
}

@requireLoad((props) => props.friends.get('friendIds') != null)
@requirePermission(hasFriend)
export class FriendDetail extends Component {

  static propTypes = {
    users: React.PropTypes.object.isRequired,
    friends: React.PropTypes.object.isRequired,
  };

  renderFriendDetails(friend) {
    const {profile: {email, gravatarHash}} = friend
    return (
      <div>
        <Row>
          <Col md={12}>
            <Image src={gravatarSrc({hash: gravatarHash, size: '400x400'})} rounded responsive />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>{getName(friend)}</h2> <br />
            {email}
          </Col>
        </Row>
      </div>
    )
  }

  render() {

    const friendId = this.props.params.id
    const {users} = this.props

    const friend = users.get(friendId)

    const isReady = isLoaded(friend)

    return (
      <Grid>
        <Row>
          <Col md={3}>
            <h1>User Profile</h1>
            <Loading isReady={isReady}>
              {isReady && this.renderFriendDetails(friend)}
            </Loading>
          </Col>
          <Col md={9}>
            <h1>Tasks assigned by you</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}
