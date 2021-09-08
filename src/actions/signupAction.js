import agent from "services/agent";
import Types from "utils/types";
import config from "utils/config";

const signupAction = (signupPayload) => async (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: Types.SIGNUP.SIGNUP_ACTION_LOADING,
      payload: null,
    });

    const payloadToSend = { ...signupPayload, scope: "CUSTOMER" };
    delete payloadToSend.confirmPassword;

    agent.Auth.signUp(payloadToSend).then((apiResponse) => {
      if (apiResponse && apiResponse.data && apiResponse.data.success) {
        const {
          data: {
            result: { result },
          },
        } = apiResponse;

        localStorage.setItem(config.USER_DETAIL, JSON.stringify(result));
        dispatch({
          type: Types.SIGNUP.SIGNUP_ACTION_SUCCESS,
          payload: apiResponse.data,
        });

        resolve();
      } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
        dispatch({
          type: Types.SIGNUP.SIGNUP_ACTION_FAILURE,
          payload: apiResponse.data,
        });
      }
    });
  });

export { signupAction };
