import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "components/Button";

import PaymentMode from "./paymentMode";
import CouponCode from "./couponCode";

import {
  notifySuccessToast,
  notifyErrorToast,
  handlePayment,
} from "utils/helperFucntion";

import {
  updateOrderListAction,
  addOrderAction,
  spinnerAction,
  clearCheckoutListAction,
  clearOrderListAction,
  getUserInfoAction,
  clearCouponCodeAction,
} from "actions";

import styles from "./payment.module.scss";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      offline: false,
      couponCode: "",
    };
  }

  componentDidMount() {
    this.handleSpinner(true);
    this.props.getUserInfoAction(this.handleSpinner);
  }

  handlePaymentMode = (onlineValue, offlineValue) =>
    this.setState({ online: onlineValue, offline: offlineValue });

  handleCouponCode = (couponCode) => this.setState({ couponCode });

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  getFinalAmount = () => {
    const { orderPayload, couponPayload } = this.props;
    const couponCode = couponPayload?.result;
    const baseCost = orderPayload.totalCost;
    const finalAmount =
      couponCode && couponCode !== undefined
        ? baseCost - (baseCost * couponCode) / 100
        : baseCost;

    return finalAmount;
  };
  handleOrder = (modeOfPayment, paymentId) => {
    const {
      history,
      addOrderAction,
      orderPayload,
      clearCheckoutListAction,
      clearOrderListAction,
      clearCouponCodeAction,
    } = this.props;
    this.handleSpinner(true);

    const finalAmount = this.getFinalAmount();

    const finalOrderPayload = paymentId
      ? {
          ...orderPayload,
          modeOfPayment,
          payment_ref_id: paymentId,
          totalCost: finalAmount,
        }
      : {
          ...orderPayload,
          modeOfPayment,
          totalCost: finalAmount,
        };

    addOrderAction(finalOrderPayload, this.handleSpinner).then(() => {
      clearCheckoutListAction();
      clearOrderListAction();
      clearCouponCodeAction();
      notifySuccessToast("Order placed successfully!");
      history.push("/order");
    });
  };

  handleOnlinePayment = () => {
    const { userInfo, orderPayload } = this.props;
    const address = orderPayload?.selectedAddress?.address;
    const finalAmount = this.getFinalAmount();
    const amount = finalAmount * 100;

    const paymentPayload = {
      amount,
      address,
      ...userInfo,
    };
    handlePayment(paymentPayload, this.handleOrder);
  };

  render() {
    const { offline, online, couponCode } = this.state;
    const formData = { offline, online };

    return (
      <div className={styles.paymentMainContainer}>
        <div className={styles.headerContainer}>
          <h3>Payment</h3>
        </div>
        <CouponCode
          couponCode={couponCode}
          handleCouponCode={this.handleCouponCode}
        />
        <PaymentMode
          formData={formData}
          handlePaymentMode={this.handlePaymentMode}
        />
        <div className={styles.proceedButtonContainer}>
          <Button
            type="submit"
            variant="primary"
            className={styles.proceedButtonStyle}
            onClick={() => {
              offline
                ? this.handleOrder("Cash On Delivery")
                : online
                ? this.handleOnlinePayment()
                : notifyErrorToast("Please select mode of payment to proceed");
            }}
          >
            Buy
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateOrderListAction,
  addOrderAction,
  spinnerAction,
  clearCheckoutListAction,
  clearOrderListAction,
  getUserInfoAction,
  clearCouponCodeAction,
};

const mapStateToProps = ({
  checkoutListReducer: checkoutListState,
  localOrderReducer,
  orderReducer,
  userReducer,
  vendorReducer,
}) => {
  return {
    checkoutList: checkoutListState.checkoutItems,
    orderPayload: localOrderReducer.orderDetails,
    placedOrder: orderReducer?.placedOrder,
    userInfo: userReducer?.userInfoPayload?.result,
    couponPayload: vendorReducer?.couponPayload?.result,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
