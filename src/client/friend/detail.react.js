import React from 'react'
import {Component} from 'vlux'
import {Row, Col, Grid} from 'react-bootstrap'
import {requireLoad} from '../helpers/require_load.react'
import {requirePermission} from '../helpers/require_permission.react'
import {requireAuth} from '../auth/require_registration_state.react'
import {actions as actionNames} from './actions'
import {OpenTasks} from '../task/task_widget.react'
import {getFriendTasks} from '../task/helpers'
import {ListenFriendTasks} from '../task/listen_tasks.react'
import {TaskModal} from '../task/task_modal.react'
import {UserProfile} from '../user/profile_widget.react'

function hasFriend(props) {
  return props.friends.get('friendIds').contains(props.params.id)
}

@requireAuth
@requireLoad((props) => props.friends.get('friendIds') != null)
@requirePermission(hasFriend)
export class FriendDetail extends Component {

  static propTypes = {
    users: React.PropTypes.object.isRequired,
    friends: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    tasks: React.PropTypes.object.isRequired,
    firebase: React.PropTypes.object.isRequired,
  };

  render() {

    const friendId = this.props.params.id
    const {tasks, users, friends: {task: {editedTask: task}}, actions, dispatch, firebase} = this.props
    const {tasks: {submitTask}, friends: {editTask, addTask}} = actions
    const {auth: {uid}} = this.props

    const friend = users.get(friendId)

    const taskActions = {
      editTask,
      addTask: () => addTask(uid, friendId),
      ...actions.tasks,
    }

    const tasksReady = tasks.get(friendId) != null

    return (
      <Grid>
        <ListenFriendTasks {...{firebase, dispatch, friendId, uid}} />
        <Row>
          <Col md={3}>
            <h1>User Profile</h1>
            <UserProfile user={friend} />
          </Col>
          <Col md={9}>
            {task && <TaskModal {...{task, submitTask}}
              hide={() => dispatch(actionNames.editTask, null)}
              setTaskData={(keyPath, data) => dispatch(actionNames.setEditedTaskData, [keyPath, data])}
            />}
            <h1>Tasks assigned by you</h1>
            {tasksReady && <OpenTasks
              tasks={getFriendTasks(tasks, friendId)}
              {...{users, taskActions}}
            />}
          </Col>
        </Row>
      </Grid>
    )
  }
}
