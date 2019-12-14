import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatStateReducer from './chatStateReducer'
import errorReducer from "./errorReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chat: chatStateReducer
});
