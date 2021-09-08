import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "reducers/rootReducer";

import throttle from "lodash/throttle";

import { loadState, saveState } from "services/localStorage";

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(
  throttle(() => {
    saveState({
      checkoutListReducer: store.getState().checkoutListReducer,
      localOrderReducer: store.getState().localOrderReducer,
      vendorReducer: store.getState().vendorReducer,
    });
  }, 1000)
);

export default store;
