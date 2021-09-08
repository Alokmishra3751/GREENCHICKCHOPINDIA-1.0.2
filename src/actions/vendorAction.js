import agent from "services/agent";
import Types from "utils/types";

import {
  notifyErrorToast,
  notifySuccessToast,
  isVendorSelected,
} from "utils/helperFucntion";

const getVendorAction = (location, spinnerAction) => async (dispatch) => {
  dispatch({
    type: Types.VENDOR.GET_VENDOR_LOADING,
    payload: null,
  });
  const apiResponse = await agent.Vendor.getVendor(location);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.VENDOR.GET_VENDOR_SUCCESS,
      payload: apiResponse.data,
    });
    apiResponse?.data?.result?.result.length === 0 &&
      notifyErrorToast("We are not currently serving at this location");
    spinnerAction(false);
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.VENDOR.GET_VENDOR_FAILURE,
      payload: apiResponse.data,
    });
    spinnerAction(false);
  }
};

const getCouponCodeAction = (payload, spinnerAction) => async (dispatch) => {
  dispatch({
    type: Types.VENDOR.GET_COUPON_CODE_LOADING,
    payload: null,
  });

  const vendorId = isVendorSelected();
  const couponPayload = { ...payload, vendorId };
  const apiResponse = await agent.Vendor.getCoupon(couponPayload);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.VENDOR.GET_COUPON_CODE_SUCCESS,
      payload: apiResponse.data,
    });
    spinnerAction(false);
    notifySuccessToast("Coupon code applied successfully!");
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.VENDOR.GET_COUPON_CODE_FAILURE,
      payload: apiResponse.data,
    });
    spinnerAction(false);
    notifyErrorToast(apiResponse.data.result.error);
  }
};

const clearCouponCodeAction = () => async (dispatch) => {
  dispatch({
    type: Types.VENDOR.CLEAR_COUPON_CODE,
  });
};

const clearVendorInfoAction = () => async (dispatch) => {
  dispatch({
    type: Types.VENDOR.CLEAR_VENDOR_STATE,
  });
};

const setVendorIdAction = (vendorId) => async (dispatch) => {
  dispatch({
    type: Types.VENDOR.SET_VENDOR_ID,
    payload: vendorId,
  });
};

export {
  getVendorAction,
  getCouponCodeAction,
  clearCouponCodeAction,
  clearVendorInfoAction,
  setVendorIdAction,
};
