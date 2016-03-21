import React from 'react'
import {Component} from 'vlux'
import {registrationStatus, UNREGISTERED} from '../auth/registration_status'
import {Navbar, NavItem, Nav} from 'react-bootstrap'

export class Header extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
  }

  navigate(route) {
    return this.props.actions.auth.redirectTo(route)
  }

  renderNavItems() {
    const {auth, users} = this.props
    if (registrationStatus(users, auth) === UNREGISTERED) {
      return this.renderUnregistered()
    } else {
      return this.renderRegistered()
    }
  }

  renderUnregistered() {
    return (
      <Nav>
        <NavItem onClick={(e) => this.navigate('/login')}>Login</NavItem>
        <NavItem onClick={(e) => this.navigate('/signup')}>Register</NavItem>
      </Nav>
    )
  }

  renderRegistered() {
    return (
      <Nav>
        <NavItem onClick={(e) => this.props.actions.auth.logout()}>Logout</NavItem>
      </Nav>
    )
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={(e) => this.props.actions.auth.redirectTo('/')}>ToDoShare</a>
          </Navbar.Brand>
        </Navbar.Header>
        {this.renderNavItems()}
      </Navbar>
    )
  }
}
