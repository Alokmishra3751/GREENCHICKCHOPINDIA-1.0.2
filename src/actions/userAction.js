import agent from "services/agent";
import Types from "utils/types";

import { notifySuccessToast } from "utils/helperFucntion";

const getUserInfo = () => (dispatch) =>
  new Promise((resolve, reject) => {
    agent.User.getUserInfo().then((apiResponse) => {
      if (apiResponse && apiResponse.data && apiResponse.data.success) {
        dispatch({
          type: Types.USER.GET_USER_ACTION_SUCCESS,
          payload: apiResponse.data.result,
        });
        resolve(apiResponse.data.result);
      } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
        dispatch({
          type: Types.USER.GET_USER_ACTION_FAILURE,
          payload: apiResponse.data,
        });
        reject(apiResponse.data);
      }
    });
  });

const getUserInfoAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.USER.GET_USER_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.User.getUserInfo();

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.USER.GET_USER_ACTION_SUCCESS,
      payload: apiResponse.data.result,
    });
    handleSpinner(false);
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.USER.GET_USER_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
  }
};

const updateUserInfo = (payload) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: Types.USER.UPDATE_USER_ACTION_LOADING,
      payload: null,
    });

    agent.User.updateUserInfo(payload).then((apiResponse) => {
      if (apiResponse && apiResponse.data && apiResponse.data.success) {
        resolve(apiResponse.data);
        dispatch({
          type: Types.USER.UPDATE_USER_ACTION_SUCCESS,
          payload: apiResponse.data.result,
        });
      } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
        reject(apiResponse.data);
        dispatch({
          type: Types.USER.UPDATE_USER_ACTION_FAILURE,
          payload: apiResponse.data,
        });
      }
    });
  });

const updateUserPassword = (handleSpinner, userPayload) => async (dispatch) => {
  dispatch({
    type: Types.USER.CHANGE_USER_PASSWORD_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.User.changeUserPassword(userPayload);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.USER.CHANGE_USER_PASSWORD_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
    notifySuccessToast(apiResponse.data.result.result);
    handleSpinner(false);
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.USER.CHANGE_USER_PASSWORD_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
  }
};

const forgetUserPasswordAction = (
  handleSpinner,
  userPayload,
  resetForm
) => async (dispatch) => {
  dispatch({
    type: Types.USER.FORGET_USER_PASSWORD_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.User.forgetUserPassword(userPayload);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.USER.FORGET_USER_PASSWORD_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
    notifySuccessToast(apiResponse.data.result.result);
    handleSpinner(false);
    resetForm();
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.USER.FORGET_USER_PASSWORD_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
  }
};

const resetUserPasswordAction = (
  handleSpinner,
  userPayload,
  resetId,
  resetForm,
  history
) => async (dispatch) => {
  dispatch({
    type: Types.USER.RESET_USER_PASSWORD_ACTION_LOADING,
    payload: null,
  });

  const passwordPayload = { password: userPayload.password };
  const apiResponse = await agent.User.resetUserPassword(
    resetId,
    passwordPayload
  );

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.USER.RESET_USER_PASSWORD_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
    notifySuccessToast(apiResponse.data.result.result);
    handleSpinner(false);
    resetForm();
    history.push("/login");
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.USER.RESET_USER_PASSWORD_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
  }
};

export {
  getUserInfoAction,
  updateUserInfo,
  updateUserPassword,
  forgetUserPasswordAction,
  resetUserPasswordAction,
  getUserInfo,
};
