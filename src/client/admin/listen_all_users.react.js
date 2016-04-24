import React from 'react'
import {Component} from 'vlux'
import {listenFirebase} from '../helpers/listen_firebase.react'
import {ListenUsers} from '../user/listen_user.react'
import {actions} from './actions'
import {getActiveIds} from './helpers'

const ListenUserIds = listenFirebase(
  (props) => props.firebase.child(`user/role`).orderByChild('created'),
  (e, props, data) => {
    if (data.val() == null) return []
    return props.onIds(Object.keys(data.val()))
  }
)

export class ListenAllUsers extends Component {

  static propTypes = {
    userIds: React.PropTypes.object,
    firebase: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    page: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,
  }

  render() {
    const {userIds, firebase, dispatch, page, pageSize} = this.props
    const usersToLoad = getActiveIds(userIds, page, pageSize)

    return (
      <div>
        <ListenUserIds
          firebase={firebase}
          onIds={(ids) => dispatch(actions.onUserIds, ids)}
        />
        <ListenUsers {...{firebase, dispatch, ids: usersToLoad}} />
      </div>
    )
  }
}
