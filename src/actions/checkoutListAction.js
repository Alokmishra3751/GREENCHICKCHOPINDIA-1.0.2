import Types from "utils/types";

import { loadState } from "services/localStorage";

const clearCheckoutListAction = () => async (dispatch) => {
  dispatch({
    type: Types.CHECKOUT.CLEAR_CHECKOUT_LIST,
    payload: undefined,
  });
};

const getCheckoutListAction = () => async (dispatch) => {
  const payload = loadState();
  dispatch({
    type: Types.CHECKOUT.GET_CHECKOUT_LIST,
    payload: payload ? payload.checkoutListReducer.checkoutItems : undefined,
  });
};

const updateCounterCheckoutAction = (selectedItem) => async (dispatch) => {
  const payload = loadState();
  const persistedCheckoutList = payload;
  const existedCheckoutItem =
    persistedCheckoutList.checkoutListReducer.checkoutItems;

  const updatePresentItem = existedCheckoutItem.map((existItem) => {
    if (
      existItem.counterId === selectedItem.counterId &&
      existItem.type.toLowerCase() === selectedItem.type.toLowerCase()
    ) {
      return Object.assign({}, existItem, {
        quantity: selectedItem.quantity,
        cost: selectedItem.quantity * existItem.baseCost,
      });
    }
    return Object.assign({}, existItem);
  });

  dispatch({
    type: Types.CHECKOUT.UPDATE_COUNTER_CHECKOUT_LIST,
    payload: updatePresentItem,
  });
};

const updateCheckoutListAction = (checkoutItem, shouldAddQuantity) => async (
  dispatch
) => {
  const payload = loadState();

  if (
    payload === undefined ||
    Object.keys(payload.checkoutListReducer).length === 0
  ) {
    const newItemToAdd = Object.assign({}, checkoutItem, {
      baseCost: checkoutItem.cost,
      cost: checkoutItem.cost * checkoutItem.quantity,
      quantity: checkoutItem.quantity,
    });

    dispatch({
      type: Types.CHECKOUT.UPDATE_CHECKOUT_LIST,
      payload: [newItemToAdd],
    });
  } else if (payload) {
    const persistedCheckoutList = payload;

    const existedCheckoutItem =
      persistedCheckoutList.checkoutListReducer.checkoutItems;

    const itemPresent = existedCheckoutItem.filter(
      (item) =>
        item.counterId === checkoutItem.counterId &&
        item.type.toLowerCase() === checkoutItem.type.toLowerCase()
    );

    let updatePresentItem;
    if (itemPresent.length > 0) {
      updatePresentItem = existedCheckoutItem.map((existItem) => {
        if (
          existItem.counterId === checkoutItem.counterId &&
          existItem.type.toLowerCase() === checkoutItem.type.toLowerCase()
        ) {
          return Object.assign({}, existItem, {
            quantity: shouldAddQuantity
              ? existItem.quantity + checkoutItem.quantity
              : checkoutItem.quantity,
            cost:
              existItem.baseCost *
              (shouldAddQuantity
                ? existItem.quantity + checkoutItem.quantity
                : checkoutItem.quantity),
          });
        }
        return Object.assign({}, existItem);
      });
    }

    const newItemToAdd = Object.assign({}, checkoutItem, {
      baseCost: checkoutItem.cost,
      cost: checkoutItem.cost * checkoutItem.quantity,
      quantity: checkoutItem.quantity,
    });
    const newCheckoutList =
      itemPresent.length > 0
        ? updatePresentItem
        : existedCheckoutItem.concat(newItemToAdd);

    dispatch({
      type: Types.CHECKOUT.UPDATE_CHECKOUT_LIST,
      payload: newCheckoutList,
    });
  }
};

const removeCheckoutListAction = (selectedCheckoutItemId, type) => async (
  dispatch
) => {
  const persistedCheckoutList = loadState();
  if (persistedCheckoutList) {
    const existedCheckoutItem =
      persistedCheckoutList.checkoutListReducer.checkoutItems;
    let newCheckoutList = [];
    existedCheckoutItem.forEach((item) => {
      if (item.counterId === selectedCheckoutItemId) {
        if (item.type.toLowerCase() === type.toLowerCase()) {
          return;
        }
      }
      return newCheckoutList.push(item);
    });

    dispatch({
      type: Types.CHECKOUT.REMOVE_CHECKOUT_LIST,
      payload: newCheckoutList,
    });
  }
};

export {
  getCheckoutListAction,
  updateCheckoutListAction,
  removeCheckoutListAction,
  updateCounterCheckoutAction,
  clearCheckoutListAction,
};
