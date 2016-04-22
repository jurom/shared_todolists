import React from 'react'
import {Component} from 'vlux'
import {requireAuth} from '../auth/require_registration_state.react'
import {Grid, Row, Col} from 'react-bootstrap'
import {fromJS} from 'immutable'
import {renderNav} from '../helpers/navigation.react'

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

  render() {
    const {children, ...propsNoChildren} = this.props
    return (
      <Grid>
        <Row>
          <Col md={2}>
            {renderNav(this.context.router, {
              baseRoute: '/dashboard',
              items: fromJS([
                {
                  route: 'friend',
                  label: 'Friends',
                },
                {
                  route: 'mytasks',
                  label: 'My tasks',
                }
              ]),
              navProps: {
                bsStyle: 'pills',
                stacked: true,
              }
            })}
          </Col>
          <Col md={10}>
            {React.cloneElement(this.props.children, propsNoChildren)}
          </Col>
        </Row>
      </Grid>
    )
  }
}
