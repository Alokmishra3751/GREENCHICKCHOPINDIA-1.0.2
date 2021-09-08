import Types from "utils/types";

const getOrderListAction = () => async (dispatch) => {
  dispatch({
    type: Types.ORDER.GET_LOCAL_ORDER_LIST,
  });
};

const updateOrderListAction = (payload) => async (dispatch) => {
  dispatch({
    type: Types.ORDER.UPDATE_LOCAL_ORDER_LIST,
    payload: payload,
  });
};

const clearOrderListAction = () => async (dispatch) => {
  dispatch({
    type: Types.ORDER.CLEAR_LOCAL_ORDER_LIST,
  });
};

export { getOrderListAction, updateOrderListAction, clearOrderListAction };
