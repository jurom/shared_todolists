import React from 'react'
import {Component} from 'vlux'
import {Accordion, Panel, Well, ButtonGroup, Button, Badge} from 'react-bootstrap'
import {isCompleted, isDeleted, taskStyle} from './helpers'
import {isLoaded, getName} from '../user/helpers'

export class Task extends Component {

  static propTypes = {
    task: React.PropTypes.object.isRequired,
    taskId: React.PropTypes.string.isRequired,
    editTask: React.PropTypes.func.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    users: React.PropTypes.object.isRequired
  }

  render() {
    const {task, taskId, users, editTask, completeTask, deleteTask} = this.props
    const {fromUser, header, content, id} = task
    const isTaskEditable = !isCompleted(task) && !isDeleted(task)

    const taskAuthor = users.get(fromUser)

    const isReady = isLoaded(taskAuthor)

    const getHeader = () =>
      <span>
        {header}
        <Badge style={{float: 'right'}}>
          {getName(taskAuthor)}
        </Badge>
      </span>

    return isReady && (
      <Panel collapsible eventKey={id} header={getHeader()} bsStyle={taskStyle(task)} >
        <Well>{content || 'No description.'}</Well>
        {isTaskEditable && <ButtonGroup>
          <Button
            onClick={() => editTask(task, taskId)}
            bsStyle="warning"
          >Edit</Button>
          <Button
            onClick={() => completeTask(task, taskId)}
            bsStyle="success"
          >Done</Button>
          <Button
            onClick={() => deleteTask(task, taskId)}
            bsStyle="danger"
          >Won't Do</Button>
        </ButtonGroup>}
      </Panel>
    )
  }
}


export class TaskList extends Component {

  static propTypes = {
    tasks: React.PropTypes.object.isRequired,
    taskActions: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }

  render() {
    const {tasks, taskActions, users} = this.props

    return (
      <Accordion>
        {tasks.map((task, taskId) =>
          <Task key={taskId} {...{task, taskId, users, ...taskActions}} />
        ).valueSeq()}
      </Accordion>
    )
  }
}
