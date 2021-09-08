import agent from "services/agent";
import Types from "utils/types";
import { notifyErrorToast, isVendorSelected } from "utils/helperFucntion";

const getDeliveryDateAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.ORDER.GET_DELIVERY_DATE_LOADING,
    payload: null,
  });

  const apiResponse = await agent.Order.getDeliveryDate();

  if (
    apiResponse &&
    apiResponse.data &&
    apiResponse.data.status === "success"
  ) {
    const getDeliveryDataForVendor = apiResponse?.data?.result;

    dispatch({
      type: Types.ORDER.GET_DELIVERY_DATE_SUCCESS,
      payload: getDeliveryDataForVendor,
    });
    handleSpinner(false);
  } else if (
    apiResponse &&
    apiResponse.data &&
    apiResponse.data.status !== "success"
  ) {
    dispatch({
      type: Types.ORDER.GET_DELIVERY_DATE_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
    notifyErrorToast(apiResponse.data.result.error);
  }
};

const getOrderAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.ORDER.GET_CUSTOMER_ORDER_LOADING,
    payload: null,
  });

  const apiResponse = await agent.Order.getCustomerOrder();
  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.ORDER.GET_CUSTOMER_ORDER_SUCCESS,
      payload: apiResponse.data,
    });
    handleSpinner(false);
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.ORDER.GET_CUSTOMER_ORDER_FAILURE,
      payload: apiResponse.data,
    });
    handleSpinner(false);
  }
};

const addOrderAction = (orderPayload, handleSpinner) => async (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: Types.ORDER.CREATE_CUSTOMER_ORDER_LOADING,
      payload: null,
    });

    const vendorId = isVendorSelected();

    agent.Order.addCustomerOrder(orderPayload, vendorId)
      .then((apiResponse) => {
        if (apiResponse && apiResponse.data && apiResponse.data.success) {
          resolve(apiResponse.data);
          dispatch({
            type: Types.ORDER.CREATE_CUSTOMER_ORDER_SUCCESS,
            payload: apiResponse.data,
          });
          handleSpinner(false);
        } else if (
          apiResponse &&
          apiResponse.data &&
          !apiResponse.data.success
        ) {
          dispatch({
            type: Types.ORDER.CREATE_CUSTOMER_ORDER_FAILURE,
            payload: apiResponse.data,
          });
          handleSpinner(false);
          notifyErrorToast(apiResponse.data.result.error);
        }
      })
      .catch((e) => notifyErrorToast("Something went wrong!!"));
  });

export { getOrderAction, addOrderAction, getDeliveryDateAction };
