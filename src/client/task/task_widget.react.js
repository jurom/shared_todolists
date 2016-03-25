import React from 'react'
import {Component} from 'vlux'
import {Panel, Button} from 'react-bootstrap'
import {TaskList} from './tasklist.react'
import {requireLoad} from '../helpers/require_load.react'

@requireLoad((props) => props.tasks != null)
export class OpenTasks extends Component {

  static propTypes = {
    tasks: React.PropTypes.object.isRequired,
    taskActions: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }

  render() {
    const {tasks, taskActions, taskActions: {addTask}, users} = this.props

    return (
      <Panel header="Open tasks" bsStyle="primary">
        <TaskList {...{tasks, taskActions, users}} />
        <Button
          onClick={addTask}
          bsStyle="primary"
        >Add Task</Button>
      </Panel>
    )
  }
}
