import {Component} from 'vlux'
import React from 'react'
import {Grid, Row, Col, Button, Input} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {requireUnauth} from './require_registration_state.react'
import {Validate, IsRequired, IsEmail, HasLength} from 'react-custom-validation'
import {validityProps, nameToPlaceholder} from './helpers'

@requireUnauth
export class Signup extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
  };

  render() {

    const {dispatch, actions: {auth: actions}, auth: {signup: {fields, validation}}} = this.props

    const onValidation = (name) => (validity) => {
      dispatch(actionNames.validation, [['signup', 'validation', name], validity])
    }

    const validityForInput = validityProps(validation)

    const propsForInput = (name) => ({
      onChange: (e) => dispatch(actionNames.set, [['signup', 'fields', name], e.target.value]),
      value: fields.get(name),
      placeholder: nameToPlaceholder[name],
      ...validityForInput(name)
    })

    return (
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} >
            <h1>Register</h1>
            <Validate onValidation={onValidation('email')}>
              <Input type="text" {...propsForInput('email')} />
              <IsRequired />
              <IsEmail />
            </Validate>
            <Validate onValidation={onValidation('password')}>
              <Input type="password" {...propsForInput('password')} />
              <IsRequired />
              <HasLength min={8} msg={'Password should be at least 8 characters long'} />
            </Validate>
            <Validate onValidation={onValidation('firstName')}>
              <Input type="text" {...propsForInput('firstName')} />
              <IsRequired />
            </Validate>
            <Validate onValidation={onValidation('lastName')}>
              <Input type="text" {...propsForInput('lastName')} />
              <IsRequired />
            </Validate>
            <Button
              onClick={(e) => actions.signup(fields)}
              bsStyle="primary"
            >Sign up</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}
