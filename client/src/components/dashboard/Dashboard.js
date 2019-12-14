import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SocketClient from 'socket.io-client'

// Custom Imports
import FriendList from './FriendList'
import CurrentConversationHeader from './CurrentConversationHeader'
import MessageInput from './MessageInput'
import VideoRecieverNotification from './Essentials/VideoRecieverNotification'
import VideoCallerNotification from './Essentials/VideoCallerNotification'
import VideoCallPane from './Essentials/VideoCallPane'
import Chat from './Chat';



const socket = SocketClient('http://localhost:5000');
const initialStates = {
  isCalling: false,
  isRecieving: false,
  isInitiator: false,
  CallerInformation: {
    name: null
  },
  video: {
    shouldStreamVideo: false
  }
}

class Dashboard extends Component {
  state = { ...initialStates }



  componentWillMount() {



    socket.on('GIVE_CLIENT_META_DATA', () => {
      const { user } = this.props.auth;
      socket.emit('TAKE_CLIENT_META_DATA', user.id)
    });

    socket.on('REQUEST-VIDEO-CALL', ({ caller_information: user }) => {
      this.setState({ isCalling: false, isRecieving: true, CallerInformation: { ...this.state.CallerInformation, name: user.name } });
    })


    socket.on('CALL-DECLINED', () => {
      this.setState({ isRecieving: false, isCalling: false, video: { shouldStreamVideo: false } });
    });

    socket.on('CALL-ACCEPTED', () => {

      this.setState({ isRecieving: false, isCalling: false, video: { shouldStreamVideo: true } })
    });

    socket.on('VIDEO-CALL-ENDED', () => {
      this.setState({ ...initialStates })
    });
  }



  resetVideoCallStates = () => {
    this.setState({ ...initialStates })
  }






  acceptedCall = () => {
    socket.emit('CALL-ACCEPTED', this.props.conversation_id)
  }
  declinedCall = () => {
    socket.emit('CALL-DECLINED', this.props.conversation_id);

  }


  makeACall = (conversation_id) => {
    const { user } = this.props.auth;

    this.setState({ isCalling: true, isInitiator: true })
    socket.emit('REQUEST-VIDEO-CALL', { conversation_id, caller_information: user })

  }





  render() {
    const { user } = this.props.auth;
    const { shouldStreamVideo } = this.state.video
    return (<div className="row" style={{ width: '100%' }}>

      {shouldStreamVideo && <VideoCallPane resetVideoCallStates={this.resetVideoCallStates} conversation_id={this.props.conversation_id} isInitiator={this.state.isInitiator} socket={socket} />}
      <VideoCallerNotification declinedCall={this.declinedCall} recieverName={this.props.activeUsername} Caller={this.state.isCalling} />
      <VideoRecieverNotification declinedCall={this.declinedCall} acceptedCall={this.acceptedCall} callerName={this.state.CallerInformation.name} Reciever={this.state.isRecieving} />


      <FriendList />
      <div className="col s12 m8 l8" style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '0px' }}>
        <CurrentConversationHeader makeACall={this.makeACall} />
        <Chat />
        <MessageInput user_id={user.id} conversation_id={this.props.conversation_id} socket={socket} />

      </div>
    </div >
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  conversation_id: state.chat.conversation_id,
  activeUsername: state.chat.activeUsername,
  friends: state.auth.user.friends,
  peer: state.auth.peer
});

export default connect(mapStateToProps)(Dashboard);
