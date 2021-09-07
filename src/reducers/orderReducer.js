import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ORDER.GET_CUSTOMER_ORDER_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ORDER.GET_CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        customerOrder: { ...action.payload },
      };
    case Types.ORDER.GET_CUSTOMER_ORDER_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        customerOrder: { ...action.payload },
      };

    case Types.ORDER.CREATE_CUSTOMER_ORDER_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ORDER.CREATE_CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        placedOrder: { ...action.payload },
      };
    case Types.ORDER.CREATE_CUSTOMER_ORDER_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        placedOrder: { ...action.payload },
      };

    case Types.ORDER.GET_DELIVERY_DATE_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ORDER.GET_DELIVERY_DATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        deliveryPayload: [...action.payload],
      };
    case Types.ORDER.GET_DELIVERY_DATE_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        deliveryPayload: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};
