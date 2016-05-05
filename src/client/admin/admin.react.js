import React from 'react'
import {Component} from 'vlux'
import {fromJS} from 'immutable'
import {Grid, Row, Col, Button, Pagination, FormGroup, FormControl} from 'react-bootstrap'
import {isBlocked, isLoaded, isAdmin, getName} from '../user/helpers'
import {ListenSearchedUsers} from '../helpers/listen_search.react'
import {getActiveIds, getSearchedUserIds} from './helpers'
import {Loading} from '../helpers/loading.react'
import {requireAuth} from '../auth/require_registration_state.react'
import {requirePermission} from '../helpers/require_permission.react'
import {getProfileSearchIndices, encodeSearch} from '../../common/auth_actions'
import {ListenUsers} from '../user/listen_user.react'

@requireAuth
@requirePermission((props) => isAdmin(props.user))
export class Admin extends Component {

  static propTypes ={
    firebase: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    admin: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  }

  fitsSearch(user, search) {
    if (!isLoaded(user)) return false
    const {profile} = user
    const eSearch = encodeSearch(search)
    return fromJS(getProfileSearchIndices(profile))
      .some((val, key) => val.startsWith(eSearch))
  }

  render() {
    const {firebase, actions: {admin: adminActions},
      admin: {page, pageSize, search: {userIds, value}}, users, user, dispatch} = this.props

    const searchedIds = getSearchedUserIds(userIds)

    const activeIds = getActiveIds(searchedIds, page, pageSize)

    return (
      <Grid>
        <ListenUsers {...{firebase, dispatch, ids: activeIds}} />
        <ListenSearchedUsers {...{search: value, firebase, setSearchedIds: adminActions.setSearchedIds}}
          minLength={1}
        />
        {userIds != null && <div>
          <Row>
            <Col xs={4}>
              <h2>Manage users</h2>
            </Col>
            <Col xs={4}>
              <FormGroup controlId="searchFriends">
                <FormControl
                  type="text"
                  onChange={(e) => adminActions.setSearch(e.target.value)}
                  value={value}
                  placeholder={'Enter user\'s name'}
                />
              </FormGroup>
            </Col>
            <Col xs={4}>
              <Pagination prev next first last
                items={Math.ceil(searchedIds.count() / pageSize)}
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
                {isLoaded(user) &&
                  <UserRow
                    user={user}
                    blockUser={adminActions.blockUser}
                    loginAsUser={adminActions.loginAsUser}
                  />}
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
    loginAsUser: React.PropTypes.func.isRequired,
  }

  render() {
    const {user, blockUser, loginAsUser} = this.props

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
          <Button onClick={() => loginAsUser(user.get('id'))}>
            Login
          </Button>
        </Col>
      </Row>
    )
  }
}
