import { SELECT_ACTIVE_CHAT_USER, SET_ACTIVE_USER } from './types';
import axios from 'axios'
export const selectActiveChatUser = (conversation_id) => dispatch => {

    axios.get(`/api/messages/${conversation_id}`).then(({ data }) => {
        dispatch({
            type: SELECT_ACTIVE_CHAT_USER,
            payload: {
                messages: data,
            }
        })
    })
}


export const setActiveUserName = (username, email, conversation_id) => {
    return {
        type: SET_ACTIVE_USER,
        payload: { username, conversation_id, email }
    }
}