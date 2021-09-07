import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.OTP.VERIFY_OTP_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.OTP.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        verifyOtpPayload: { ...action.payload },
      };
    case Types.OTP.VERIFY_OTP_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        verifyOtpPayload: { ...action.payload },
      };
    case Types.OTP.RESEND_OTP_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.OTP.RESEND_OTP_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        resendOtpPayload: { ...action.payload },
      };
    case Types.OTP.RESEND_OTP_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        resendOtpPayload: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
