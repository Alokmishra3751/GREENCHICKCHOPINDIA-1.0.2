import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PRODUCT.GET_PRODUCT_ITEM_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.PRODUCT.GET_PRODUCT_ITEM_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        productPayload: { ...action.payload },
      };
    case Types.PRODUCT.GET_PRODUCT_ITEM_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        productPayload: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
