import { combineReducers } from "redux";

import loginReducer from "reducers/loginReducer";
import signupReducer from "reducers/signupReducer";
import checkoutListReducer from "reducers/checkoutListReducer";
import userReducer from "reducers/userReducer";
import spinnerReducer from "reducers/spinnerReducer";
import categoryReducer from "reducers/categoryReducer";
import addressReducer from "reducers/addressReducer";
import itemReducer from "reducers/itemReducer";
import bannerReducer from "reducers/bannerReducer";
import testimonialReducer from "reducers/testimonialReducer";
import localOrderReducer from "reducers/localOrderReducer";
import orderReducer from "reducers/orderReducer";
import vendorReducer from "reducers/vendorReducer";
import otpReducer from "reducers/otpReducer";

const appReducer = combineReducers({
  loginReducer,
  signupReducer,
  checkoutListReducer,
  userReducer,
  spinnerReducer,
  categoryReducer,
  addressReducer,
  itemReducer,
  bannerReducer,
  testimonialReducer,
  localOrderReducer,
  orderReducer,
  vendorReducer,
  otpReducer,
});

export default (state, action) => {
  if (action.type === "DESTROY_SESSION") {
    state.loginReducer = undefined;
    state.userReducer = undefined;
    state.addressReducer = undefined;
    state.localOrderReducer = undefined;
    state.orderReducer = undefined;
  } else if (action.type === "CLEAR_VENDOR_STATE") {
    state.vendorReducer = undefined;
  }

  return appReducer(state, action);
};
