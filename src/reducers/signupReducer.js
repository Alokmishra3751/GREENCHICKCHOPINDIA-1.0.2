import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SIGNUP.SIGNUP_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.SIGNUP.SIGNUP_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        userPayload: { ...action.payload },
      };
    case Types.SIGNUP.SIGNUP_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        userPayload: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
