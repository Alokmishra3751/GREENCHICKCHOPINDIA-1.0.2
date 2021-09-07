import axios from "axios";

import agent from "services/agent";
import Types from "utils/types";
import config from "utils/config";
import { notifySuccessToast, notifyErrorToast } from "utils/helperFucntion";

const verifyOtpAction = (otp, handleSpinner, history) => async (dispatch) => {
  dispatch({
    type: Types.OTP.VERIFY_OTP_LOADING,
    payload: null,
  });
  const userDetail = localStorage.getItem(config.USER_DETAIL);

  const parsedUserDetail = JSON.parse(userDetail);

  const verifyOtpPayload = { ...otp, ...parsedUserDetail };

  const apiResponse = await agent.Otp.verifyOtp(verifyOtpPayload);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    const {
      data: { result },
    } = apiResponse;
    localStorage.removeItem(config.USER_DETAIL);
    dispatch({
      type: Types.OTP.VERIFY_OTP_SUCCESS,
      payload: apiResponse.data,
    });
    handleSpinner(false);
    localStorage.setItem(config.AUTH_TOKEN, result?.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${result?.token}`;
    notifySuccessToast("User registered successfully!");
    history.replace("/");
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.OTP.VERIFY_OTP_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
    notifyErrorToast("Invalid Otp. Please Try Again!!");
  }
};

const resendOtpAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.OTP.RESEND_OTP_LOADING,
    payload: null,
  });
  const userDetail = localStorage.getItem(config.USER_DETAIL);

  const parsedUserDetail = JSON.parse(userDetail);
  if (parsedUserDetail?.mobile) {
    const resendPayload = { mobile: parsedUserDetail.mobile };

    const apiResponse = await agent.Otp.resendOtp(resendPayload);

    if (apiResponse && apiResponse.data && apiResponse.data.success) {
      dispatch({
        type: Types.OTP.RESEND_OTP_SUCCESS,
        payload: apiResponse.data,
      });
      handleSpinner(false);
      notifySuccessToast("Otp sent Successfully!");
    } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
      dispatch({
        type: Types.OTP.RESEND_OTP_FAILURE,
        payload: apiResponse.data,
      });
      handleSpinner(false);
      notifyErrorToast("Something went wrong!!");
    }
  }
  handleSpinner(false);
  notifyErrorToast("Something went wrong!!");
};

export { verifyOtpAction, resendOtpAction };
