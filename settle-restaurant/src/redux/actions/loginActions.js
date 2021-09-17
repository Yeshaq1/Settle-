/* Library */
import axiosInstance, { baseURL } from "../../api";
import axios from "axios";

/* Actions Types */
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export const CLEAR_STATE = "CLEAR_STATE";

/* User Login */
export function userLogin(formData) {
  return function (dispatch) {
    return axiosInstance
      .post("api/restaurant/login", formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(userLoginSuccess(res));
        } else {
          dispatch(userLoginFailed(res));
        }
      })
      .catch(function (error) {
        const data = {
          status: 503,
          data: {},
          message: "Something Went Wrong! please try again",
        };
        dispatch(userLoginFailed(data));
      });
  };
}

function userLoginSuccess(data) {
  return { type: USER_LOGIN_SUCCESS, data: data };
}

function userLoginFailed(data) {
  return { type: USER_LOGIN_FAILED, data: data };
}

export function clearState() {
  return function (dispatch) {
    dispatch({ type: CLEAR_STATE });
  };
}
