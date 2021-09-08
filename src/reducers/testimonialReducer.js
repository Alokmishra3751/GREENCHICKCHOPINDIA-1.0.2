import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.USER.GET_TESTIMONIAL_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.GET_TESTIMONIAL_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        testimonialPayload: { ...action.payload },
      };
    case Types.USER.GET_TESTIMONIAL_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        testimonialPayload: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
