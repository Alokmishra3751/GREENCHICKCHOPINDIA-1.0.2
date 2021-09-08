import agent from "services/agent";
import Types from "utils/types";
import { notifyErrorToast } from "utils/helperFucntion";

const getProductCategoryAction = (vendorId) => async (dispatch) => {
  dispatch({
    type: Types.PRODUCT.GET_PRODUCT_CATEGORY_LOADING,
    payload: null,
  });

  const apiResponse =
    vendorId !== null
      ? await agent.Product.getCategoryListByVendor(vendorId)
      : await agent.Product.getCategoryList();

  if (
    apiResponse &&
    apiResponse.data &&
    apiResponse.data.status === "success"
  ) {
    dispatch({
      type: Types.PRODUCT.GET_PRODUCT_CATEGORY_SUCCESS,
      payload: apiResponse.data,
    });
  } else if (
    apiResponse &&
    apiResponse.data &&
    apiResponse.data.status !== "success"
  ) {
    dispatch({
      type: Types.PRODUCT.GET_PRODUCT_CATEGORY_FAILURE,
      payload: apiResponse.data,
    });
    notifyErrorToast(apiResponse.data.result.error);
  }
};

export { getProductCategoryAction };
