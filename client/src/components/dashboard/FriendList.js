import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addFriends } from '../../actions/authActions'
import { selectActiveChatUser, setActiveUserName } from '../../actions/chatStateActions'

import axios from 'axios'
class FriendList extends Component {
    state = {
        activeUser: null
    }

    componentWillMount() {
        const { id } = this.props.user;
        axios.get(`/api/friends/list/${id}`).then(({ data }) => this.props.dispatch(addFriends(data)))
    }


    isActiveUser = (conversation_id) => {
        const { activeUser } = this.state
        if (activeUser === conversation_id) return "active"
        else return "null"
    }

    chatHandler = (event) => {
        const { dispatch } = this.props;
        const { id } = event.target;
        const username = event.target.getAttribute('data-user');
        const email = event.target.getAttribute('data-email');

        this.setState({ activeUser: id })
        this.props.dispatch(setActiveUserName(username, email, id))
        this.props.dispatch(selectActiveChatUser(id));
    }
    render() {
        const { friends } = this.props;
        return (
            <div className="col m4 l4 hide-on-small-only" style={{ margin: '0px', padding: '0px', minHeight: '100vh', maxHeight: '100vh', overflowX: 'hidden', overflowY: 'scroll' }}>
                <ul className="collection" style={{ margin: '0px', }}>
                    {
                        friends && friends.map(friend => (
                            <li onClick={this.chatHandler} data-email={friend.email} data-user={friend.name} id={friend.conversation_id} key={friend._id} className={`collection-item avatar ${this.isActiveUser(friend.conversation_id)}`}>
                                <img id={friend.conversation_id} data-email={friend.email} data-user={friend.name} src="http://archives.materializecss.com/0.100.2/images/yuna.jpg" className="circle" />
                                <span id={friend.conversation_id} data-email={friend.email} data-user={friend.name} className="title">{friend.name}</span>
                                <p id={friend.conversation_id} data-email={friend.email} data-user={friend.name}>
                                    Second Line
                                </p>
                                <Link to="#/audio" className="secondary-content btn-floating z-depth-0 btn"><i className="material-icons waves-effect">phone</i></Link>
                            </li>

                        ))
                    }
                </ul>

            </div >
        );
    }
}

const mapStateToProps = ({ auth, chat }) => {
    return {
        auth: auth,
        user: auth.user,
        peer: auth.peer,
        friends: auth.user.friends,
        activeUser: chat.activeUser
    }
}
export default connect(mapStateToProps)(FriendList)