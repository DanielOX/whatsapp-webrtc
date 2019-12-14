import React, { Component } from 'react'
import { addMessage } from '../../actions/messageActions'
import { connect } from 'react-redux';

class MessageInput extends Component {

    state = {
        message: ""
    }

    componentDidMount() {
        const { socket } = this.props
        socket.on('MESSAGE', ({ message, user_id }) => {
            this.props.dispatch(addMessage(message, user_id))
        });
    }
    sendMessage = (e) => {
        e.preventDefault();
        const { socket, user_id, conversation_id } = this.props;
        const { message } = this.state;
        socket.emit('MESSAGE', {
            message,
            conversation_id,
            user_id
        });
        this.setState({ message: '' })

    }
    render() {
        const positionMessageInput = {
            position: 'fixed',
            top: 'calc(100% - 15vh)',
            backgroundColor: 'white',
            width: 'calc(100%)',
            maxWidth: '65%'
        }
        return (
            <form onSubmit={this.sendMessage} style={positionMessageInput} >
                <div className="row" style={{ padding: '12px 24px' }}>
                    <div className="input-field col s11">
                        <input onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message} type="text" />
                        <label >Type Message Here</label>
                        <button onClick={this.sendMessage} type="submit" className="btn  btn-floating white-text" style={{ position: 'absolute', top: 'calc(0px + 1vh)', left: 'calc(100% + 1vh)' }}>
                            <i className="material-icons">send</i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect()(MessageInput)