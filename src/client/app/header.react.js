import React from 'react'
import {Component} from 'vlux'
import {registrationStatus, UNREGISTERED} from '../auth/registration_status'
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap'

export class Header extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
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
      <Nav pullRight>
        <NavItem onClick={(e) => this.navigate('/login')}>Login</NavItem>
        <NavItem onClick={(e) => this.navigate('/signup')}>Register</NavItem>
      </Nav>
    )
  }

  renderRegistered() {
    const {user: {profile: {email}}} = this.props
    return (
      <Nav pullRight>
        <NavDropdown id="profile-dropdown" title={email}>
          <MenuItem >Settings</MenuItem>
          <MenuItem onClick={(e) => this.props.actions.auth.logout()} >Logout</MenuItem>
        </NavDropdown>
      </Nav>
    )
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={(e) => this.props.actions.auth.redirectTo('/dashboard')}>ToDoShare</a>
          </Navbar.Brand>
        </Navbar.Header>
        {this.renderNavItems()}
      </Navbar>
    )
  }
}
