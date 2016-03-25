import React from 'react'
import {Component} from 'vlux'
import {Modal, Input, ButtonToolbar, Button} from 'react-bootstrap'

export class TaskModal extends Component {

  static propTypes = {
    task: React.PropTypes.object.isRequired,
    submitTask: React.PropTypes.func.isRequired,
    setTaskData: React.PropTypes.func.isRequired,
    hide: React.PropTypes.func.isRequired,
  }

  render() {
    const {task, task: {header, content}, hide, setTaskData, submitTask} = this.props
    return (
      <Modal show={true} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            onChange={(e) => setTaskData(['header'], e.target.value)}
            placeholder={'Enter short task title'}
            value={header}
          />
          <Input
            type="textarea"
            onChange={(e) => setTaskData(['content'], e.target.value)}
            placeholder={'Enter task description'}
            value={content}
          />
          <ButtonToolbar>
            <Button
              onClick={() => {
                submitTask(task)
                hide()
              }}
              bsStyle="success"
            >
              Submit
            </Button>
            <Button
              onClick={hide}
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
