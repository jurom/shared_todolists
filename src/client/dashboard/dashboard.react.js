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
    const selectedKey = items
      .map(({route}) => route)
      .filter((route) => router.isActive(route))
      .first()
    return (
      <Nav bsStyle="pills" stacked onSelect={(route) => router.push(route)} activeKey={selectedKey}>
        {items.map(({route, label}) =>
          <NavItem eventKey={route} key={route} >{label}</NavItem>
        )}
      </Nav>
    )
  }

  render() {

    return (
      <Grid>
        <Row>
          <Col md={3}>
            {this.renderNav(fromJS([
              {
                route: '/dashboard/list',
                label: 'Friend list'
              },
              {
                route: '/dashboard/findfriends',
                label: 'Find friends'
              }
            ]))}
          </Col>
          <Col md={9}>
            {React.cloneElement(this.props.children, this.props)}
          </Col>
        </Row>
      </Grid>
    )
  }
}
