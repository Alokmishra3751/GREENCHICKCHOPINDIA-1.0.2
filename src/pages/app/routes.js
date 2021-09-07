import React, { Component } from "react";

import { Route } from "react-router-dom";

import PrivateRoute from "components/PrivateRoute";

import Home from "pages/home";
import Login from "pages/login";
import SignUp from "pages/signUp";
import ResetPassword from "pages/resetPassword";
import ForgetPassword from "pages/forgetPassword";
import ProductOverview from "pages/productOverview";
import ProductList from "pages/productList";
import Checkout from "pages/checkout";
import VerifyOtp from "pages/verifyOtp";
import Profile from "pages/account/profile";
import Orders from "pages/account/orders";
import ChangePassword from "pages/account/changePassword";
import Address from "pages/address";
import Payment from "pages/payment";
import DeliveryTimeslot from "pages/deliveryTimeslot";

export default class Routes extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
        <Route
          exact
          path="/category/:type"
          component={(props) => (
            <ProductList categoryType={props?.location?.state?.title} />
          )}
        />
        <Route exact path="/product/:id" component={ProductOverview} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/verifyOtp" component={VerifyOtp} />
        <Route exact path="/forgetPassword" component={ForgetPassword} />
        <Route exact path="/resetPassword/:resetId" component={ResetPassword} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/order" component={Orders} />
        <PrivateRoute exact path="/address" component={Address} />
        <PrivateRoute exact path="/changePassword" component={ChangePassword} />
        <PrivateRoute exact path="/payment" component={Payment} />
        <PrivateRoute
          exact
          path="/deliveryTimeslot"
          component={DeliveryTimeslot}
        />
      </>
    );
  }
}
