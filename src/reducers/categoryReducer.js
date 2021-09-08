import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PRODUCT.GET_PRODUCT_CATEGORY_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.PRODUCT.GET_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        categoryList: { ...action.payload },
      };
    case Types.PRODUCT.GET_PRODUCT_CATEGORY_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        categoryList: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
