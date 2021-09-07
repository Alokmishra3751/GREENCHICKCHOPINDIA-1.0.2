import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.CUSTOMER.GET_ADDRESS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.CUSTOMER.GET_ADDRESS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        addressList: { ...action.payload },
      };
    case Types.CUSTOMER.GET_ADDRESS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        addressList: { ...action.payload },
      };

    case Types.CUSTOMER.ADD_ADDRESS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.CUSTOMER.ADD_ADDRESS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        addressPayload: { ...action.payload },
      };
    case Types.CUSTOMER.ADD_ADDRESS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        addressPayload: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
