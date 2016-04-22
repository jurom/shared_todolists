import React from 'react'
import {Component} from 'vlux'
import {UserProfile} from '../user/profile_widget.react'
import {Row, Col} from 'react-bootstrap'
import {TaskWidget} from '../task/task_widget.react'
import {TaskModal} from '../task/task_modal.react'
import {getUserTasks} from '../task/helpers'
import {ListenMyTasks} from '../task/listen_tasks.react'
import {actions as actionNames} from './actions'
import {requireAuth} from '../auth/require_registration_state.react'

@requireAuth
export class MyTasks extends Component {

  static propTypes = {
    users: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    tasks: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    dashboard: React.PropTypes.object.isRequired,
    firebase: React.PropTypes.object.isRequired,
  }

  render() {

    const {users, user, tasks, auth: {uid},
      dashboard: {myTasks: {editedTask: task, filter}}, dispatch} = this.props
    const {actions: {dashboard: {addTask, editTask}, tasks: {submitTask}}, firebase} = this.props

    const taskActions = {
      addTask: () => addTask(uid, uid),
      editTask,
      ...this.props.actions.tasks
    }

    return (
      <Row>
        <ListenMyTasks {...{dispatch, firebase, uid}} />
        <Col md={3} >
          <h1>My Profile</h1>
          <UserProfile user={user} />
        </Col>
        <Col md={9} >
          <h1>My tasks</h1>
          {task && <TaskModal {...{task, submitTask}}
            hide={() => dispatch(actionNames.editTask, null)}
            setTaskData={(keyPath, data) => dispatch(actionNames.setEditedTaskData, [keyPath, data])}
          />}
          <TaskWidget
            tasks={getUserTasks(tasks, uid)}
            changeFilter={(filterName) => dispatch(actionNames.setTaskFilter, filterName)}
            {...{users, taskActions, filter}}
          />
        </Col>
      </Row>
    )
  }
}
