import React from 'react'
import ReactDOM from 'react-dom'
import {Component} from 'vlux'
import {Image, InputGroup, FormControl, Button} from 'react-bootstrap'
import {getName, isLoaded} from '../user/helpers'
import {gravatarSrc} from '../helpers/gravatar'
import {ListenMessages} from './listen_messages.react'
import {requireLoad} from '../helpers/require_load.react'
import {FormattedRelative} from 'react-intl'

@requireLoad((props) => isLoaded(props.user) && isLoaded(props.friend))
export class ChatWidget extends Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    friend: React.PropTypes.object.isRequired,
    conversation: React.PropTypes.object,
    messageActions: React.PropTypes.object.isRequired,
    firebase: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    // Init empty message
    if (this.props.conversation == null) {
      this.props.messageActions.setCurrentMessage(this.props.friend.get('id'), '')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.conversation == null) return
    if (((prevProps.conversation == null) && (this.props.conversation != null))
        || (prevProps.conversation.get('messages') !== this.props.conversation.get('messages'))) {
      this.scrollDownChatWindow()
    }
  }

  componentDidMount() {
    this.scrollDownChatWindow()
  }

  renderHeader() {
    return (
      <span>Chat</span>
    )
  }

  scrollDownChatWindow() {
    const chatWindow = ReactDOM.findDOMNode(this.refs.window)
    chatWindow.scrollTop = chatWindow.scrollHeight
  }

  renderMessageHeader(message, isOutgoing) {
    const {timestamp} = message
    const {user, friend} = this.props
    if (isOutgoing) {
      return (
        <div className="header">
          <small className=" text-muted"><FormattedRelative value={timestamp}/></small>
          <strong className="pull-right primary-font">{getName(user)}</strong>
        </div>
    )
    } else {
      return (
        <div className="header">
          <strong className="primary-font">{getName(friend)}</strong>
          <small className="pull-right text-muted"><FormattedRelative value={timestamp}/></small>
        </div>
      )
    }
  }

  getMessageAuthor(message) {
    const {user, friend} = this.props
    const {author} = message
    return user.get('id') === author ? user : friend
  }

  renderMessage = (message, id) => {
    const {author, content} = message
    const {user} = this.props
    const isOutgoing = user.get('id') === author
    const gravatarHash = this.getMessageAuthor(message).getIn(['profile', 'gravatarHash'])
    return (
      <li key={id} className={(isOutgoing ? 'right' : 'left') + ' clearfix'}>
        <span className={'chat-img ' + (isOutgoing ? 'pull-right' : 'pull-left')}>
          <Image height="50px" src={gravatarSrc({hash: gravatarHash, size: '50x50'})} circle />
        </span>
        <div className="chat-body clearfix">
          {this.renderMessageHeader(message, isOutgoing)}
          <p>{content}</p>
        </div>
      </li>
    )
  }

  renderFooter(currentMessage, sendMessage, changeMessage) {
    return (
      <InputGroup>
        <FormControl
          type="text"
          value={currentMessage}
          placeholder="Type your message here.."
          onChange={(e) => changeMessage(e.target.value)}
          onKeyUp={(e) => (e.keyCode === 13) && sendMessage()}
        />
        <InputGroup.Button>
          <Button onClick={sendMessage}>Send</Button>
        </InputGroup.Button>
      </InputGroup>
    )
  }

  render() {
    const {conversation: {messages = null, currentMessage}, messageActions, friend, user, firebase} = this.props
    return (
      <div>
        <ListenMessages {...{firebase,
          userId: user.get('id'),
          friendId: friend.get('id'),
          messageActions,
        }} />
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.renderHeader()}
          </div>
          <div className="panel-body" ref={'window'} >
            <ul className="chat">
              {messages && messages.map(this.renderMessage).valueSeq()}
            </ul>
          </div>
          <div className="panel-footer">
            {this.renderFooter(
              currentMessage,
              () => messageActions.sendMessage(friend.get('id'), currentMessage),
              (message) => messageActions.setCurrentMessage(friend.get('id'), message)
            )}
          </div>
        </div>
      </div>
    )
  }
}
