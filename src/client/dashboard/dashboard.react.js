import React from 'react'
import {Component} from 'vlux'
import {requireAuth} from '../auth/require_registration_state.react'
import {Grid, Nav, NavItem, Row, Col} from 'react-bootstrap'
import {fromJS} from 'immutable'

@requireAuth
export class Dashboard extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    dashboard: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  renderNav(items) {
    const router = this.context.router
    const absRoute = (route) => `/dashboard/${route}`
    const selectedKey = items
      .map(({route}) => absRoute(route))
      .filter((route) => router.isActive(route))
      .first()
    return (
      <Nav bsStyle="pills" stacked onSelect={(route) => router.push(route)} activeKey={selectedKey}>
        {items.map(({route, label}) =>
          <NavItem eventKey={absRoute(route)} key={route} >{label}</NavItem>
        )}
      </Nav>
    )
  }

  render() {
    const {children, ...propsNoChildren} = this.props
    return (
      <Grid>
        <Row>
          <Col md={2}>
            {this.renderNav(fromJS([
              {
                route: 'friend',
                label: 'Friends'
              },
            ]))}
          </Col>
          <Col md={10}>
            {React.cloneElement(this.props.children, propsNoChildren)}
          </Col>
        </Row>
      </Grid>
    )
  }
}
