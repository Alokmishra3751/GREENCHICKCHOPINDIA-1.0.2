import axios from "axios";

import agent from "services/agent";
import Types from "utils/types";
import config from "utils/config";

const loginAction = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: Types.LOGIN.LOGIN_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.Auth.login(email, password);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    const {
      data: {
        result: {
          result: { token },
        },
      },
    } = apiResponse;
    localStorage.setItem(config.AUTH_TOKEN, token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({
      type: Types.LOGIN.LOGIN_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.LOGIN.LOGIN_ACTION_FAILURE,
      payload: apiResponse.data,
    });
  }
};

const otpLoginAction = ({ phoneNumber, otp }) => async (dispatch) => {
  dispatch({
    type: Types.LOGIN.LOGIN_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.Auth.otpLogin(phoneNumber, otp);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    const {
      data: {
        result: {
          result: { token },
        },
      },
    } = apiResponse;
    localStorage.setItem(config.AUTH_TOKEN, token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({
      type: Types.LOGIN.LOGIN_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.LOGIN.LOGIN_ACTION_FAILURE,
      payload: apiResponse.data,
    });
  }
};

const logoutAction = () => async (dispatch) => {
  dispatch({
    type: Types.DESTROY_SESSION,
  });
};

export { logoutAction, loginAction, otpLoginAction };
