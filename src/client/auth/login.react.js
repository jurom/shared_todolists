import {Component} from 'vlux'
import React from 'react'
import {Grid, Row, Col, Button, Input} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {requireUnauth} from './require_registration_state.react'
import {validityProps, nameToPlaceholder, formValid} from './helpers'
import {Validate, IsRequired, IsEmail} from 'react-custom-validation'

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
      auth: {login: {fields, validation}}
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
            <form onSubmit={this.onSubmit} >
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
