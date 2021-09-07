import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN.LOGIN_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.LOGIN.LOGIN_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        loggedInUser: { ...action.payload },
      };
    case Types.LOGIN.LOGIN_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        loggedInUser: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
