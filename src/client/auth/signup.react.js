import {Component} from 'vlux'
import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {requireUnauth} from './require_registration_state.react'
import {Validate, IsRequired, IsEmail, HasLength} from 'react-custom-validation'
import {formValid} from './helpers'
import {createInputsFor} from './field_helpers.react'

@requireUnauth
export class Signup extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
  };

  onSubmit = (e) => {
    // Prevent refresh
    e.preventDefault()
    const {actions: {auth: actions}, auth: {signup: {fields}}} = this.props
    return actions.signup(fields)
  }

  render() {

    const {dispatch, auth: {signup, signup: {fields, validation}}} = this.props

    const {renderInput, onValidation} = createInputsFor(
      'signup',
      (v) => dispatch(actionNames.validation, v),
      (v) => dispatch(actionNames.set, v),
      signup
    )

    return (
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} >
            <form onSubmit={this.onSubmit}>
              <h1>Register</h1>
              {renderInput('email')}
              {renderInput('password', 'password')}
              {renderInput('firstName')}
              {renderInput('lastName')}
              <Validate onValidation={onValidation('email')}>
                <IsRequired value={fields.get('email')} />
                <IsEmail value={fields.get('email')} />
              </Validate>
              <Validate onValidation={onValidation('password')}>
                <IsRequired value={fields.get('password')} />
                <HasLength
                  min={8}
                  value={fields.get('password')}
                  msg={'Password should be at least 8 characters long'}
                />
              </Validate>
              <Validate onValidation={onValidation('firstName')}>
                <IsRequired value={fields.get('firstName')} />
              </Validate>
              <Validate onValidation={onValidation('lastName')}>
                <IsRequired value={fields.get('lastName')} />
              </Validate>
              <Button
                type="submit"
                onClick={this.onSubmit}
                bsStyle="primary"
                disabled={!formValid(validation)}
              >Sign up</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}
