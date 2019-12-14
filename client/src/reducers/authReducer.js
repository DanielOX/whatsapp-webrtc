import { SET_CURRENT_USER, USER_LOADING, ADD_NEW_FRIENDS } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  friends: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_NEW_FRIENDS:
      if (action.payload.length > 0) {
        state.user.friends = [...state.user.friends, ...action.payload];
      }
      return {
        ...state
      }
    default:
      return state;
  }
}
