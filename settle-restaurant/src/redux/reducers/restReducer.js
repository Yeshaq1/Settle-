import {
  FETCH_RESTAURANT_DETAILS_SUCCESS,
  FETCH_RESTAURANT_DETAILS_FAILURE,
  RESTAURANT_PASSWORD_RESET_SUCCESS,
  RESTAURANT_PASSWORD_RESET_FAILURE,
  RESTAURANT_FEEDBACK_FETCH_SUCCESS,
  RESTAURANT_FEEDBACK_FETCH_FAILURE,
  RESTAURANT_ORDER_FETCH_SUCCESS,
  RESTAURANT_ORDER_FETCH_FAILURE,
  CLEAR_STATE,
} from "../actions/restAction";

const Restaurant = (state = {}, action) => {
  switch (action.type) {
    /* Resturent Details */
    case FETCH_RESTAURANT_DETAILS_SUCCESS:
      return { type: FETCH_RESTAURANT_DETAILS_SUCCESS, responce: action.data };
    case FETCH_RESTAURANT_DETAILS_FAILURE:
      return { type: FETCH_RESTAURANT_DETAILS_FAILURE, responce: action.data };
    case RESTAURANT_PASSWORD_RESET_SUCCESS:
      return { type: RESTAURANT_PASSWORD_RESET_SUCCESS, responce: action.data };
    case RESTAURANT_PASSWORD_RESET_FAILURE:
      return { type: RESTAURANT_PASSWORD_RESET_FAILURE, responce: action.data };
    case RESTAURANT_FEEDBACK_FETCH_SUCCESS:
      return { type: RESTAURANT_FEEDBACK_FETCH_SUCCESS, responce: action.data };
    case RESTAURANT_FEEDBACK_FETCH_FAILURE:
      return { type: RESTAURANT_FEEDBACK_FETCH_FAILURE, responce: action.data };
    case RESTAURANT_ORDER_FETCH_SUCCESS:
      return { type: RESTAURANT_ORDER_FETCH_SUCCESS, responce: action.data };
    case RESTAURANT_ORDER_FETCH_FAILURE:
      return { type: RESTAURANT_ORDER_FETCH_FAILURE, responce: action.data };

    /* CLEAR THE STATE VALUE */
    case CLEAR_STATE:
      return {};

    default:
      return state;
  }
};

export default Restaurant;
