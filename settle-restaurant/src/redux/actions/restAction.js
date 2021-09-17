/* Library */
import axiosInstance, { baseURL } from "../../api";
import axios from "axios";

/* Actions Types */
export const FETCH_RESTAURANT_DETAILS_SUCCESS =
  "FETCH_RESTAURANT_DETAILS_SUCCESS";
export const FETCH_RESTAURANT_DETAILS_FAILURE =
  "FETCH_RESTAURANT_DETAILS_FAILURE";
export const RESTAURANT_PASSWORD_RESET_SUCCESS =
  "RESTAURANT_PASSWORD_RESET_SUCCESS";
export const RESTAURANT_PASSWORD_RESET_FAILURE =
  "RESTAURANT_PASSWORD_RESET_FAILURE";
export const RESTAURANT_FEEDBACK_FETCH_SUCCESS =
  "RESTAURANT_FEEDBACK_FETCH_SUCCESS";
export const RESTAURANT_FEEDBACK_FETCH_FAILURE =
  "RESTAURANT_FEEDBACK_FETCH_FAILURE";
export const RESTAURANT_ORDER_FETCH_SUCCESS = "RESTAURANT_ORDER_FETCH_SUCCESS";
export const RESTAURANT_ORDER_FETCH_FAILURE = "RESTAURANT_ORDER_FETCH_FAILURE";

export const CLEAR_STATE = "CLEAR_STATE";

/* Restaurant */
export function restFetch(formData) {
  return function (dispatch) {
    return axiosInstance
      .get("api/restaurant/getprofile")
      .then((res) => {
        if (res.status === 200) {
          dispatch(restDataFetchSuccess(res));
        } else {
          dispatch(restDataFetchFail(res));
        }
      })
      .catch(function (error) {
        const data = {
          status: 503,
          data: {},
          message: "Something Went Wrong! please try again",
        };
        dispatch(restDataFetchFail(data));
      });
  };
}

function restDataFetchSuccess(data) {
  return { type: FETCH_RESTAURANT_DETAILS_SUCCESS, data: data };
}

function restDataFetchFail(data) {
  return { type: FETCH_RESTAURANT_DETAILS_FAILURE, data: data };
}

export function restPassChange(formData) {
  return function (dispatch) {
    return axiosInstance
      .post("api/restaurant/changePassword", formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(restPassChangeSuccess(res));
        } else {
          dispatch(restPassChangeFail(res));
        }
      })
      .catch(function (error) {
        const data = {
          status: 503,
          data: {},
          message: "Something Went Wrong! please try again",
        };
        dispatch(restPassChangeFail(data));
      });
  };
}

function restPassChangeSuccess(data) {
  return { type: RESTAURANT_PASSWORD_RESET_SUCCESS, data: data };
}

function restPassChangeFail(data) {
  return { type: RESTAURANT_PASSWORD_RESET_FAILURE, data: data };
}

export function restFeedFetch(formData) {
  return function (dispatch) {
    return axiosInstance
      .post("api/restaurant/getfeedbacks", formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(restFeedbackFetchSuccess(res));
        } else {
          dispatch(restFeedbackFetchFail(res));
        }
      })
      .catch(function (error) {
        const data = {
          status: 503,
          data: {},
          message: "Something Went Wrong! please try again",
        };
        dispatch(restFeedbackFetchFail(data));
      });
  };
}

function restFeedbackFetchSuccess(data) {
  return { type: RESTAURANT_FEEDBACK_FETCH_SUCCESS, data: data };
}

function restFeedbackFetchFail(data) {
  return { type: RESTAURANT_FEEDBACK_FETCH_FAILURE, data: data };
}

export function restOrderFetch(formdata) {
  return function (dispatch) {
    return axiosInstance
      .post("api/restaurant/transaction/list", formdata)
      .then((res) => {
        if (res.status === 200) {
          dispatch(restOrderFetchSuccess(res));
        } else {
          dispatch(restOrderFetchFail(res));
        }
      })
      .catch(function (error) {
        const data = {
          status: 503,
          data: {},
          message: "Something Went Wrong! please try again",
        };
        dispatch(restOrderFetchFail(data));
      });
  };
}

function restOrderFetchSuccess(data) {
  return { type: RESTAURANT_ORDER_FETCH_SUCCESS, data: data };
}

function restOrderFetchFail(data) {
  return { type: RESTAURANT_ORDER_FETCH_FAILURE, data: data };
}

export function clearState() {
  return function (dispatch) {
    dispatch({ type: CLEAR_STATE });
  };
}
