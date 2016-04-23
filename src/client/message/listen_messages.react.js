import React from 'react'
import {Component} from 'vlux'
import {listenFirebase} from '../helpers/listen_firebase.react'

export const ListenNewMessages = listenFirebase(
  (props) => props.firebase.child(`message/${props.fromId}/${props.toId}`),
  (e, props, data) => {
    props.onNewMessage({
      fromId: props.fromId,
      toId: props.toId,
      message: data.val(),
      key: data.key(),
    })
  },
  ['child_added']
)

export class ListenMessages extends Component {

  static propTypes = {
    messageActions: React.PropTypes.object.isRequired,
    firebase: React.PropTypes.object.isRequired,
    friendId: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.props.messageActions.loadMessages(this.props.friendId)
  }

  render() {
    const {firebase, friendId, userId, messageActions} = this.props
    return (
      <div>
        <ListenNewMessages
          firebase={firebase}
          fromId={userId}
          toId={friendId}
          onNewMessage={({fromId, toId, message, key}) => messageActions.onNewMessage({
            conversationId: friendId,
            message,
            key,
          })}
        />
        <ListenNewMessages
          firebase={firebase}
          fromId={friendId}
          toId={userId}
          onNewMessage={({fromId, toId, message, key}) => messageActions.onNewMessage({
            conversationId: friendId,
            message,
            key,
          })}
        />
      </div>
    )
  }
}
