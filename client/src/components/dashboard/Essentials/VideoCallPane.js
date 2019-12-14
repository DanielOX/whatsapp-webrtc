import React, { Component } from 'react'
import './VideoCallStyles.css'
// Simple Peer Import

import Peer from 'simple-peer'

class VideoCallPane extends Component {

    remoteStream = React.createRef()
    localStream = React.createRef()
    componentDidMount() {
        const { socket } = this.props;
        this.streamVideoCall()

    }

    endCall = () => {
        const { socket } = this.props
        socket.emit('VIDEO-CALL-ENDED', this.props.conversation_id);
    }


    streamVideoCall = () => {
        const { socket } = this.props;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: { echoCancellation: true }, video: true }, stream => {


                let peer = new Peer({
                    initiator: this.props.isInitiator,
                    stream
                });

                socket.on('DESTROY-VIDEO-CALL-SESSION', () => {
                    peer.removeAllListeners();
                    peer.destroy();
                    stream.getTracks().forEach(track => track.stop());
                });

                this.localStream.current.srcObject = stream;
                this.localStream.current.play();

                peer.on('signal', (data) => {
                    socket.emit('offer', { data: JSON.stringify(data), conversation_id: this.props.conversation_id })
                });

                socket.on('offer', (data) => {
                    try {
                        peer.signal(JSON.parse(data))

                    } catch{
                        // ignore the error
                    }
                })


                peer.on('stream', (streamData) => {
                    this.remoteStream.current.srcObject = streamData;
                    this.remoteStream.current.play();
                });


            }, error => {

                alert('Please allow video and audio permission to make this call')
                this.props.resetVideoCallStates()

            });

        } else {
            alert('Sorry Your Browser Donot Support Video Call At The Moment')
            this.props.resetVideoCallStates()

        }
    }


    render() {
        return (<React.Fragment>
            <div className="video-call-container">
                <video ref={this.localStream} muted style={{ width: 200 + 'px', objectFit: 'cover', position: 'absolute', right: '20px', bottom: '20px', height: 300 + 'px', padding: "0", margin: "0" }} ></video>
                <video ref={this.remoteStream} style={{ width: window.screen.availWidth + 'px', objectFit: 'cover', height: window.screen.availHeight + 'px', padding: "0", margin: "0" }}></video>
                <button onClick={this.endCall} className="btn red white-text large btn-floating" style={{ position: 'absolute', left: '45%', bottom: "20px" }}>
                    <i className="material-icons">phone_paused</i>
                </button>
            </div>
        </React.Fragment>
        );

    }
}

export default VideoCallPane