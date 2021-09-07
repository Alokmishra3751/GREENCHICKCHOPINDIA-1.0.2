import agent from "services/agent";
import Types from "utils/types";

import { notifyErrorToast } from "utils/helperFucntion";

const getCustomerAddressAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.CUSTOMER.GET_ADDRESS_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.Customer.getCustomerAddress();

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.CUSTOMER.GET_ADDRESS_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
    handleSpinner(false);
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.CUSTOMER.GET_ADDRESS_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
    notifyErrorToast(apiResponse.data.result.error);
  }
};

const addCustomerAddressAction = (
  addressPayload,
  toggleEditAddress,
  handleSpinner
) => async (dispatch) => {
  dispatch({
    type: Types.CUSTOMER.ADD_ADDRESS_ACTION_LOADING,
    payload: null,
  });

  const apiResponse = await agent.Customer.addCustomerAddress(addressPayload);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.CUSTOMER.ADD_ADDRESS_ACTION_SUCCESS,
      payload: apiResponse.data,
    });
    toggleEditAddress(false);
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.CUSTOMER.ADD_ADDRESS_ACTION_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
    notifyErrorToast(apiResponse.data.result.error);
  }
};

export { getCustomerAddressAction, addCustomerAddressAction };
