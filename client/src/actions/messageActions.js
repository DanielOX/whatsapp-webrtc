import { ADD_NEW_MESSAGE } from './types'


export const addMessage = (message, sender_id) => {
    return {
        type: ADD_NEW_MESSAGE,
        payload: {
            message,
            sender_id
        }
    }
}