import Types from "utils/types";

export default (state = {}, action) => {
  switch (action.type) {
    case Types.CHECKOUT.GET_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.UPDATE_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.UPDATE_COUNTER_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.REMOVE_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.CLEAR_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
