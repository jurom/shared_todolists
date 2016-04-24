import React from 'react'
import {Component} from 'vlux'
import {fromJS} from 'immutable'
import {Modal, Row, Col, Grid, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {requireLoad} from '../helpers/require_load.react'
import {registrationStatus, REGISTERED} from '../auth/registration_status'

const fieldToLabel = {
  firstName: 'First name',
  lastName: 'Last name',
}

@requireLoad(({users, auth}) => registrationStatus(users, auth) === REGISTERED)
export class Settings extends Component {

  static propTypes = {
    settings: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  }

  render() {

    const {settings: {show}, user, actions: {settings: actions}, dispatch} = this.props

    const inputFor = (label, name) => {
      return (
        <FormGroup key={name} controlId={name}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl
            type="text"
            onChange={(e) => actions.updateProfile({[name]: e.target.value})}
            value={user.getIn(['profile', name])}
          />
        </FormGroup>
      )
    }
    return (
      <Modal show={show} onHide={() => dispatch(actionNames.toggleShow, false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={6}>
                <h2>Profile</h2>
                {fromJS(fieldToLabel).map(inputFor).valueSeq()}
              </Col>
              <Col md={6}>
                <h2>Account</h2>
                <Button block bsStyle="danger">Change email</Button>
                <Button block bsStyle="danger">Change password</Button>
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
      </Modal>
    )
  }
}
