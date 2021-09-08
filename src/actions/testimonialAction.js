import agent from "services/agent";
import Types from "utils/types";

import { notifyErrorToast } from "utils/helperFucntion";

const testimonialAction = () => async (dispatch) => {
  dispatch({
    type: Types.USER.GET_TESTIMONIAL_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.User.getTestimonial();

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.USER.GET_TESTIMONIAL_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.USER.GET_TESTIMONIAL_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    notifyErrorToast(apiResponse.data.result.error);
  }
};

export { testimonialAction };
