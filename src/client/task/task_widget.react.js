import React from 'react'
import {Component} from 'vlux'
import {Button, Nav, NavItem} from 'react-bootstrap'
import {TaskList} from './tasklist.react'
import {requireLoad} from '../helpers/require_load.react'
import {fromJS} from 'immutable'

const taskToLabel = fromJS({
  all: 'All',
  open: 'Open',
  done: 'Done',
  wontdo: 'Declined',
})

@requireLoad((props) => props.tasks != null)
export class TaskWidget extends Component {

  static propTypes = {
    tasks: React.PropTypes.object.isRequired,
    taskActions: React.PropTypes.object.isRequired,
    filter: React.PropTypes.string.isRequired,
    changeFilter: React.PropTypes.func.isRequired,
    users: React.PropTypes.object.isRequired
  }

  renderTabs(filter, changeFilter) {
    return (
      <Nav bsStyle="tabs" onSelect={changeFilter} activeKey={filter}>
        {taskToLabel.map((label, id) =>
          <NavItem eventKey={id} key={id} >{label}</NavItem>
        ).valueSeq()}
      </Nav>
    )
  }

  filterTasks(tasks, filter) {
    return tasks.filter(({status}) => (filter === 'all') || (status === filter))
  }

  render() {
    const {tasks, taskActions, taskActions: {addTask}, users, filter, changeFilter} = this.props

    return (
      <div>
        {this.renderTabs(filter, changeFilter)}
        <TaskList {...{tasks: this.filterTasks(tasks, filter), taskActions, users}} />
        {filter === 'open' && <Button
          onClick={addTask}
          bsStyle="primary"
        >Add Task</Button>}
      </div>
    )
  }
}
