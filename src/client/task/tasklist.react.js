import React from 'react'
import {Component} from 'vlux'
import {fromJS} from 'immutable'
import {Accordion, Panel, Well, ButtonGroup, Button, Badge} from 'react-bootstrap'
import {taskStyle, isEditable} from './helpers'
import {isLoaded, getName} from '../user/helpers'

const taskActions = fromJS({
  open: {
    label: 'Open',
    nextStatus: 'open',
    bsStyle: 'primary',
  },
  wontdo: {
    label: 'Won\'t do',
    nextStatus: 'wontdo',
    bsStyle: 'danger',
  },
  complete: {
    label: 'Done',
    nextStatus: 'done',
    bsStyle: 'success',
  },
})

const taskStateTransitions = fromJS({
  open: ['wontdo', 'complete'],
  wontdo: ['open'],
  done: ['open']
})

export class Task extends Component {

  static propTypes = {
    task: React.PropTypes.object.isRequired,
    taskId: React.PropTypes.string.isRequired,
    changeTaskStatus: React.PropTypes.func.isRequired,
    editTask: React.PropTypes.func.isRequired,
    users: React.PropTypes.object.isRequired
  }

  renderTaskActions(task, taskId, editTask, changeTaskStatus) {
    const {status} = task
    return (
      <ButtonGroup>
        {isEditable(task) && <Button
          bsStyle="warning"
          onClick={() => editTask(task, taskId)}
        >
          Edit
        </Button>}
        {taskStateTransitions.get(status)
          .map((action) => taskActions.get(action))
          .map(({label, nextStatus, bsStyle}) =>
          <Button
            key={nextStatus}
            bsStyle={bsStyle}
            onClick={() => changeTaskStatus(task, taskId, nextStatus)}
          >
            {label}
          </Button>
        )}
      </ButtonGroup>
    )
  }

  renderContent(content) {
    return (
      <Well bsSize="small">
        {content ?
          fromJS(content.split('\n')).reduce((x, y) => x.push(<span>{y}</span>, <br />), fromJS([]))
        :
          'No description.'
        }
      </Well>)
  }

  render() {
    const {task, taskId, users, editTask, changeTaskStatus} = this.props
    const {fromUser, header, content, id} = task

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
        {this.renderContent(content)}
        {this.renderTaskActions(task, taskId, editTask, changeTaskStatus)}
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
