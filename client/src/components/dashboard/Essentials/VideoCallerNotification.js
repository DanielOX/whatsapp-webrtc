import React, { Component } from 'react'

export default class VideoCallerNotification extends Component {


    modalTrigger = React.createRef()
    modalClose = React.createRef();

    componentDidUpdate() {
        if (this.props.Caller) {
            this.modalTrigger.current.click()
        } else {
            this.modalClose.current.click()
        }
    }
    render() {
        return (
            <div>
                <a ref={this.modalTrigger} className="hide waves-effect waves-light btn modal-trigger" data-target="callerModel">Modal</a>
                <div id="callerModel" className="modal call-notifications no-autoinit">
                    <div className="modal-content">
                        <h4>{this.props.recieverName}</h4>
                        <p>Calling {this.props.recieverName}...</p>
                    </div>
                    <div className="modal-footer">
                        <a onClick={this.props.declinedCall} className="modal-close waves-effect waves-red red-text btn-flat">Decline</a>
                        <a className="modal-close hide" ref={this.modalClose}></a>
                    </div>
                </div>

            </div>)
    }
}
