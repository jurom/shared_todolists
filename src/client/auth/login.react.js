import {Component} from 'vlux'
import React from 'react'
import {Grid, Row, Col, Button, Input} from 'react-bootstrap'
import {actions as actionNames} from './actions'
import {requireUnauth} from './require_registration_state.react'

@requireUnauth
export class Login extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
  };

  render() {

    const {dispatch, actions: {auth: actions}, auth: {login: {email, password}}} = this.props

    return (
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} >
            <h1>Login</h1>
            <Row>
              <Col md={12}>
                <Input
                  type="text"
                  onChange={(e) => dispatch(actionNames.set, [['login', 'email'], e.target.value])}
                  value={email}
                  placeholder="Email"
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  type="password"
                  onChange={(e) => dispatch(actionNames.set, [['login', 'password'], e.target.value])}
                  value={password}
                  placeholder="Password"
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Button
                  onClick={(e) => actions.login(email, password)}
                  bsStyle="primary"
                >Submit</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}
