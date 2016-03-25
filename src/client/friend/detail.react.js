import React from 'react'
import {Component} from 'vlux'
import {Row, Col, Grid, Image, Modal, Button, Input, ButtonToolbar} from 'react-bootstrap'
import {requireLoad} from '../helpers/require_load.react'
import {requirePermission} from '../helpers/require_permission.react'
import {requireAuth} from '../auth/require_registration_state.react'
import {isLoaded, getName} from '../user/helpers'
import {Loading} from '../helpers/loading.react'
import {gravatarSrc} from '../helpers/gravatar'
import {actions as actionNames} from './actions'
import {OpenTasks} from '../task/task_widget.react'
import {getFriendTasks} from '../task/helpers'
import {ListenFriendTasks} from '../task/listen_tasks.react'

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
    const {tasks, users, friends: {task: {editedTask: task}}, actions, dispatch, firebase} = this.props
    const {tasks: {submitTask}, friends: {editTask, addTask}} = actions
    const {auth: {uid}} = this.props

    const friend = users.get(friendId)

    const isReady = isLoaded(friend)

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
            <Loading isReady={isReady}>
              {isReady && this.renderFriendDetails(friend)}
            </Loading>
          </Col>
          <Col md={9}>
            {task && <TaskModal {...{dispatch, task, submitTask}} />}
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

class TaskModal extends Component {

  static propTypes = {
    task: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    submitTask: React.PropTypes.func.isRequired
  }

  render() {
    const {task, task: {header, content}, dispatch, submitTask} = this.props
    return (
      <Modal show={true} onHide={() => dispatch(actionNames.editTask, null)}>
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            onChange={(e) => dispatch(actionNames.setEditedTaskData, [['header'], e.target.value])}
            placeholder={'Enter short task title'}
            value={header}
          />
          <Input
            type="textarea"
            onChange={(e) => dispatch(actionNames.setEditedTaskData, [['content'], e.target.value])}
            placeholder={'Enter task description'}
            value={content}
          />
          <ButtonToolbar>
            <Button
              onClick={() => {
                submitTask(task)
                dispatch(actionNames.editTask, null)
              }}
              bsStyle="success"
            >
              Submit
            </Button>
            <Button
              onClick={() => dispatch(actionNames.editTask, null)}
              bsStyle="warning"
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Modal.Body>
      </Modal>
    )
  }
}
