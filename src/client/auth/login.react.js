import {Component} from 'vlux'
import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {requireUnauth} from './require_registration_state.react'
import {formValid} from './helpers'
import {Validate, IsRequired, IsEmail} from 'react-custom-validation'
import {createInputsFor} from './field_helpers.react'

@requireUnauth
export class Login extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault()
    const {auth: {login: {fields: {email, password}}}, actions: {auth: actions}} = this.props
    return actions.login(email, password)
  }

  render() {

    const {
      dispatch,
      auth: {login, login: {validation, fields}}
    } = this.props

    const {renderInput, onValidation} = createInputsFor(
      'login',
      (v) => dispatch(actionNames.validation, v),
      (v) => dispatch(actionNames.set, v),
      login
    )

    return (
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} >
            <form onSubmit={this.onSubmit} >
              <h1>Login</h1>
              {renderInput('email')}
              {renderInput('password', 'password')}
              <Validate onValidation={onValidation('email')} >
                <IsRequired value={fields.get('email')} />
                <IsEmail value={fields.get('email')} />
              </Validate>
              <Validate onValidation={onValidation('password')} >
                <IsRequired value={fields.get('password')} msg={'Please enter your password.'} />
              </Validate>
              <Button
                type="submit"
                onClick={this.onSubmit}
                bsStyle="primary"
                disabled={!formValid(validation)}
              >Submit</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}
