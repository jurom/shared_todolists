import React from 'react'
import {Component} from 'vlux'
import {Grid, Row, Col, Button, Pagination} from 'react-bootstrap'
import {isBlocked, isLoaded, isAdmin, getName} from '../user/helpers'
import {ListenAllUsers} from './listen_all_users.react'
import {getActiveIds} from './helpers'
import {Loading} from '../helpers/loading.react'
import {requireAuth} from '../auth/require_registration_state.react'
import {requirePermission} from '../helpers/require_permission.react'

@requireAuth
@requirePermission((props) => isAdmin(props.user))
export class Admin extends Component {

  static propTypes ={
    firebase: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    admin: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  }

  render() {
    const {firebase, dispatch, actions: {admin: adminActions},
      admin: {page, pageSize, userIds}, users} = this.props

    const activeIds = getActiveIds(userIds, page, pageSize)

    return (
      <Grid>
        <ListenAllUsers {...{firebase, dispatch, page, pageSize, userIds}} />
        {userIds != null && <div>
          <Row>
            <Col xs={6}>
              <h2>Manage users</h2>
            </Col>
            <Col xs={6}>
              <Pagination prev next first last
                items={Math.ceil(userIds.count() / pageSize)}
                activePage={page}
                onSelect={(eventKey) => adminActions.setPage(eventKey)}
                maxButtons={5}
              />
            </Col>
          </Row>
          {activeIds.map((userId) => {
            const user = users.get(userId)
            return (
              <Loading key={userId} isReady={isLoaded(user)}>
                {isLoaded(user) && <UserRow user={user} blockUser={adminActions.blockUser} />}
              </Loading>
            )
          })}
        </div>}
      </Grid>
    )
  }
}

class UserRow extends Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    blockUser: React.PropTypes.func.isRequired,
  }

  render() {
    const {user, blockUser} = this.props

    return (
      <Row>
        <Col xs={5}>
          {getName(user)}
          {isBlocked(user) && <span style={{color: 'red'}}> - blocked</span>}
        </Col>
        <Col xs={5}>
          {user.getIn(['profile', 'email'])}
        </Col>
        <Col xs={1}>
          <Button onClick={() => blockUser(user.get('id'), !isBlocked(user))}>
            {isBlocked(user) ? 'Unblock' : 'Block'}
          </Button>
        </Col>
        <Col xs={1}>
          <Button>
            Login
          </Button>
        </Col>
      </Row>
    )
  }
}
