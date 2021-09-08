import agent from "services/agent";
import Types from "utils/types";

const getProductItemAction = (vendorId, spinnerAction) => async (dispatch) => {
  dispatch({
    type: Types.PRODUCT.GET_PRODUCT_ITEM_LOADING,
    payload: null,
  });

  const apiResponse = await agent.Product.getItemList(vendorId);

  if (apiResponse && apiResponse.data && apiResponse.data.success) {
    dispatch({
      type: Types.PRODUCT.GET_PRODUCT_ITEM_SUCCESS,
      payload: apiResponse.data,
    });
    spinnerAction(false);
  } else if (apiResponse && apiResponse.data && !apiResponse.data.success) {
    dispatch({
      type: Types.PRODUCT.GET_PRODUCT_ITEM_FAILURE,
      payload: apiResponse.data,
    });
    spinnerAction(false);
  }
};

const getProductItem = (vendorId, spinnerAction) => async (dispatch) =>
  new Promise((resolve, reject) => {
    agent.Product.getItemList(vendorId)
      .then((apiResponse) => {
        spinnerAction(false);
        if (apiResponse && apiResponse.data && apiResponse.data.success) {
          dispatch({
            type: Types.PRODUCT.GET_PRODUCT_ITEM_SUCCESS,
            payload: apiResponse.data,
          });
          resolve(apiResponse.data?.result?.result);
        } else if (
          apiResponse &&
          apiResponse.data &&
          !apiResponse.data.success
        ) {
          dispatch({
            type: Types.PRODUCT.GET_PRODUCT_ITEM_FAILURE,
            payload: apiResponse.data,
          });
          spinnerAction(false);
        }
      })
      .catch(() => {
        spinnerAction(false);
        reject();
      });
  });

export { getProductItemAction, getProductItem };
