import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.USER.GET_USER_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.GET_USER_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        userInfoPayload: { ...action.payload },
      };
    case Types.USER.GET_USER_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        userInfoPayload: { ...action.payload },
      };
    case Types.USER.UPDATE_USER_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.UPDATE_USER_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        updatedUserPayload: { ...action.payload },
      };
    case Types.USER.UPDATE_USER_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        updatedUserPayload: { ...action.payload },
      };

    case Types.USER.CHANGE_USER_PASSWORD_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.CHANGE_USER_PASSWORD_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        userPayload: { ...action.payload },
      };
    case Types.USER.CHANGE_USER_PASSWORD_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        userPayload: { ...action.payload },
      };

    case Types.USER.FORGET_USER_PASSWORD_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.FORGET_USER_PASSWORD_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        forgetPasswordPayload: { ...action.payload },
      };
    case Types.USER.FORGET_USER_PASSWORD_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        forgetPasswordPayload: { ...action.payload },
      };

    case Types.USER.RESET_USER_PASSWORD_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.RESET_USER_PASSWORD_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        resetPasswordPayload: { ...action.payload },
      };
    case Types.USER.RESET_USER_PASSWORD_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        resetPasswordPayload: { ...action.payload },
      };

    default:
      return {
        ...state,
      };
  }
};
