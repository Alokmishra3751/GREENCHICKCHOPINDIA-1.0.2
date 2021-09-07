import agent from "services/agent";
import Types from "utils/types";
import { notifyErrorToast } from "utils/helperFucntion";

const bannerAction = () => async (dispatch) => {
  dispatch({
    type: Types.USER.GET_BANNER_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.User.getBanner();

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.USER.GET_BANNER_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.USER.GET_BANNER_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    notifyErrorToast(apiResponse.data.result.error);
  }
};

export { bannerAction };
