import { SELECT_ACTIVE_CHAT_USER, SET_ACTIVE_USER, ADD_NEW_MESSAGE } from '../actions/types'
const initialState = {
    messages: [],
    activeUsername: null,
    conversation_id: null,
    activeUserEmail: null
}


export default (state = initialState, action) => {


    switch (action.type) {

        case SELECT_ACTIVE_CHAT_USER:
            state.messages = [...action.payload.messages];
            return {
                ...state
            }
        case ADD_NEW_MESSAGE:
            state.messages = [...state.messages, { body: action.payload.message, sender_id: action.payload.sender_id }]
            return {
                ...state
            }
        case SET_ACTIVE_USER:
            state.activeUsername = action.payload.username;
            state.activeUserEmail = action.payload.email;
            state.conversation_id = action.payload.conversation_id;
            return {
                ...state
            }
        default:
            return { ...state };
    }

}