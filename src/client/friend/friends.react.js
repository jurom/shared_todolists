import React from 'react'
import {Component} from 'vlux'
import {Row, Col} from 'react-bootstrap'
import {fromJS} from 'immutable'
import {requireAuth} from '../auth/require_registration_state.react'
import {requireLoad} from '../helpers/require_load.react'
import {renderNav} from '../helpers/navigation.react'

@requireAuth
@requireLoad((props) => props.friends.get('friendIds') != null)
export class Friends extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    friends: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    const {...propsNoChildren, children} = this.props
    return (
      <div>
        <Row>
          <Col md={12}>
            {renderNav(this.context.router, {
              baseRoute: '/dashboard/friend',
              items: fromJS([
                {
                  route: 'list',
                  label: 'My friends',
                },
                {
                  route: 'requests',
                  label: 'Friend requests',
                },
                {
                  route: 'findfriends',
                  label: 'Find friends'
                }
              ]),
              navProps: {
                bsStyle: 'tabs',
              }
            })}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {React.cloneElement(this.props.children, propsNoChildren)}
          </Col>
        </Row>
      </div>
    )
  }
}
