import React from 'react'
import {Component} from 'vlux'
import {requireAuth} from '../auth/require_registration_state.react'
import {Grid, Row, Col} from 'react-bootstrap'
import {fromJS} from 'immutable'
import {renderNav} from '../helpers/navigation.react'
import {isLoaded} from '../user/helpers'
import {requirePermission} from '../helpers/require_permission.react'

@requireAuth
@requirePermission((props) => isLoaded(props.user))
export class Dashboard extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    dashboard: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired,
    user: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render() {
    const {children, ...propsNoChildren} = this.props
    return (
      <Grid>
        <Row>
          <Col sm={2} xs={12}>
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
          <Col sm={10} xs={12}>
            {React.cloneElement(this.props.children, propsNoChildren)}
          </Col>
        </Row>
      </Grid>
    )
  }
}
