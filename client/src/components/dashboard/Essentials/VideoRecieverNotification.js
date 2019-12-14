import React, { Component } from 'react'

export default class VideoRecieverNotification extends Component {


    modalTrigger = React.createRef()
    modalClose = React.createRef();
    componentDidUpdate() {
        if (this.props.Reciever) {
            this.modalTrigger.current.click()
        } else {
            this.modalClose.current.click()
        }
    }
    render() {
        return (
            <div>
                <audio></audio>
                <a ref={this.modalTrigger} className="hide waves-effect waves-light btn modal-trigger" data-target="recieverModel">Modal</a>
                <div id="recieverModel" className="modal call-notifications no-autoinit">
                    <div className="modal-content">
                        <h4>{this.props.callerName}</h4>
                        <p>{this.props.callerName} is calling you</p>
                    </div>
                    <div className="modal-footer">
                        <a onClick={this.props.acceptedCall} className="modal-close waves-effect waves-green green-text btn-flat">Accept</a>
                        <a onClick={this.props.declinedCall} className="modal-close waves-effect waves-red red-text btn-flat">Decline</a>
                        <a className="modal-close hide" ref={this.modalClose} ></a>
                    </div>
                </div>

            </div>)
    }
}
