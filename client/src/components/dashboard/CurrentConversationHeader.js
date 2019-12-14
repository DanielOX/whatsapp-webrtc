import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import validator from 'validator'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import { logoutUser, addFriends } from "../../actions/authActions";


class CurrentConversationHeader extends Component {

    state = {
        friend_email: null
    }
    modalClose = React.createRef()
    logoutHandler = () => {
        this.props.dispatch(logoutUser());
    }

    handleFriendEmail = async (e) => {
        e.preventDefault();
        let { friend_email } = this.state;
        let { email: user_email } = this.props.user;
        this.modalClose.current.click()
        if (!friend_email || !validator.isEmail(friend_email)) {
            toast.error('Please provide a valid email');
            return;
        }
        if (friend_email.toLowerCase() === user_email.toLowerCase()) {
            toast.error('You cannot add yourself as a friend');
            return;

        }
        try {
            const response = await axios.post('/api/friends/create', { user_email, friend_email });
            const { success, friend, error } = response.data;
            if (success) {
                toast.success('added friend successfully')
                this.props.dispatch(addFriends([friend]))
            } else {
                toast.error(error);
            }
        } catch (error) {
            toast.error('Failed to add this person as friend');
        }
    }


    render() {
        return (
            <div className="navbar-fixed z-depth-0" style={{ marginBottom: '10px' }}>
                <ToastContainer />
                <nav className="z-depth-1 white">
                    <div className="nav-wrapper  white" style={{ width: 'calc(100% - 60vh)', padding: '0px 82px 0px 24px' }}>
                        <a href="#" className="brand-logo black-text"> {this.props.activeUsername} </a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                <Link to="#/audio" className="secondary-content modal-trigger" data-target="add-friend-model">
                                    <i className="material-icons">
                                        person_add
                    </i>
                                </Link>
                            </li>

                            <li>
                                <Link to="#/audio" className="secondary-content">
                                    <i className="material-icons">
                                        phone
                    </i>
                                </Link>
                            </li>
                            <li>
                                <a onClick={(e) => this.props.makeACall(this.props.conversation_id)} className="secondary-content">
                                    <i className="material-icons">
                                        videocam
                    </i>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-trigger" data-target="user_options" >
                                    <i className="material-icons secondary-content">more_vert</i>
                                </a>
                                <ul id="user_options" className="dropdown-content" >
                                    <li className="secondary-content"> <a onClick={this.logoutHandler}>Logout</a>  </li>
                                </ul>
                            </li>


                        </ul>
                    </div>
                </nav>
                <div className="modal bottom-sheet" id="add-friend-model">
                    <div className="modal-content">
                        <form action="" onSubmit={this.handleFriendEmail}>
                            <div className="row">
                                <div className="input-field col s12 m10 m10">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input onChange={({ target }) => { this.setState({ friend_email: target.value }) }} type="email" id="friends-email" />
                                    <label htmlFor="friends-email">Type Friends Email To Add Them To Your List</label>
                                    <button type="submit" className="btn btn-floating model-close" style={{ position: 'absolute', top: 'calc(0px + 1vh)', left: 'calc(100% + 1vh)' }}>
                                        <i className="material-icons">
                                            send
                                    </i>
                                    </button>
                                    <span ref={this.modalClose} className="modal-close"></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>







        )
    }
}
const mapStateToProps = ({ auth, chat }) => ({
    user: auth.user,
    activeUsername: chat.activeUsername,
    activeUserEmail: chat.activeUserEmail,
    conversation_id: chat.conversation_id
})
export default connect(mapStateToProps)(CurrentConversationHeader);