import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.VENDOR.GET_VENDOR_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.VENDOR.GET_VENDOR_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        vendorPayload: { ...action.payload },
      };
    case Types.VENDOR.GET_VENDOR_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        vendorPayload: { ...action.payload },
      };
    case Types.VENDOR.GET_COUPON_CODE_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.VENDOR.GET_COUPON_CODE_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        couponPayload: { ...action.payload },
      };
    case Types.VENDOR.GET_COUPON_CODE_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        couponPayload: { ...action.payload },
      };
    case Types.VENDOR.SET_VENDOR_ID:
      return {
        ...state,
        vendorId: action.payload,
      };
    case Types.VENDOR.CLEAR_COUPON_CODE:
      return {
        ...state,
        couponPayload: undefined,
      };

    default:
      return {
        ...state,
      };
  }
};
