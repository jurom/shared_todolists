import {Component} from 'vlux'
import React from 'react'
import {Grid, Row, Col, Button, Input} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {requireUnauth} from './require_registration_state.react'
import {validityProps, nameToPlaceholder} from './helpers'
import {Validate, IsRequired, IsEmail} from 'react-custom-validation'

@requireUnauth
export class Login extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
  };

  render() {

    const {
      dispatch,
      actions: {auth: actions},
      auth: {login: {fields: {email, password}, fields, validation}}
    } = this.props

    const onValidation = (name) => (validity) => {
      dispatch(actionNames.validation, [['login', 'validation', name], validity])
    }

    const validityForInput = validityProps(validation)

    const propsForInput = (name) => ({
      onChange: (e) => dispatch(actionNames.set, [['login', 'fields', name], e.target.value]),
      value: fields.get(name),
      placeholder: nameToPlaceholder[name],
      ...validityForInput(name)
    })


    return (
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} >
            <h1>Login</h1>
            <Validate onValidation={onValidation('email')} >
              <Input
                type="text"
                {...propsForInput('email')}
              />
              <IsRequired />
              <IsEmail />
            </Validate>
            <Validate onValidation={onValidation('password')} >
              <Input
                type="password"
                {...propsForInput('password')}
              />
              <IsRequired msg={'Please enter your password.'} />
            </Validate>
            <Button
              onClick={(e) => actions.login(email, password)}
              bsStyle="primary"
            >Submit</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}
