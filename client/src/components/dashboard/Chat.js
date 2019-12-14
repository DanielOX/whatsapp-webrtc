import React, { Component } from 'react'
import Me from './Helpers/Me';
import Other from './Helpers/Other'

// Custom StyleSheet
import './Conversation.css'
import { connect } from 'react-redux';

class Chat extends Component {
    render() {
        const { chat, user } = this.props
        return (
            <div className="conversation">
                {chat.messages.map((message, index) => {
                    return message.sender_id === user.id
                        ?
                        <Me key={index} body={message.body} />
                        :
                        <Other key={index} body={message.body} />
                })}
            </div>)
    }
}

const mapStateToProps = ({ chat, auth }) => ({ chat, user: auth.user })
export default connect(mapStateToProps)(Chat);