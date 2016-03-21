import {Component} from 'vlux'
import React from 'react'
import {Grid, Row, Col, Button, Input} from 'react-bootstrap'
import {actions as actionNames} from './actions'

const nameToPlaceholder = {
  email: 'Email',
  password: 'Password',
  firstName: 'First name',
  lastName: 'Last name',
}

export class Signup extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
  };

  render() {

    const {dispatch, actions: {auth: actions}, auth: {signup}} = this.props

    const renderInput = (name, type = 'text') => {
      return (
        <Input
          type={type}
          onChange={(e) => dispatch(actionNames.set, [['signup', name], e.target.value])}
          value={signup.get(name)}
          placeholder={nameToPlaceholder[name]}
        />
      )
    }

    const renderRCInput = (name, options = {}) => {
      const {width = 12, type = 'text'} = options
      return (
        <Row>
          <Col md={width}>
            {renderInput(name, type)}
          </Col>
        </Row>
      )
    }

    return (
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} >
            <h1>Register</h1>
            {renderRCInput('email')}
            {renderRCInput('password', {type: 'password'})}
            {renderRCInput('firstName')}
            {renderRCInput('lastName')}
            <Row>
              <Col md={12}>
                <Button
                  onClick={(e) => actions.signup(signup)}
                  bsStyle="primary"
                >Sign up</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}
