import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  CLEAR_STATE,
} from "../actions/loginActions";

const login = (state = {}, action) => {
  switch (action.type) {
    /* USER LOGIN */
    case USER_LOGIN_SUCCESS:
      return { type: USER_LOGIN_SUCCESS, responce: action.data };
    case USER_LOGIN_FAILED:
      return { type: USER_LOGIN_FAILED, responce: action.data };

    /* CLEAR THE STATE VALUE */
    case CLEAR_STATE:
      return {};

    default:
      return state;
  }
};
export default login;
