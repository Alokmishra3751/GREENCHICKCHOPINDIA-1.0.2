import Types from "utils/types";

export default (state = { orderDetails: {} }, action) => {
  switch (action.type) {
    case Types.ORDER.GET_LOCAL_ORDER_LIST:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case Types.ORDER.UPDATE_LOCAL_ORDER_LIST:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case Types.ORDER.CLEAR_LOCAL_ORDER_LIST:
      return {
        ...state,
        orderDetails: {},
      };
    default:
      return {
        ...state,
      };
  }
};
