import React, { Component } from "react";

import { connect } from "react-redux";

import CheckoutCard from "components/CheckoutCard";
import Button from "components/Button";

import {
  getCheckoutListAction,
  removeCheckoutListAction,
  updateCounterCheckoutAction,
  updateOrderListAction,
} from "actions";

import { notifyErrorToast } from "utils/helperFucntion";

import styles from "./checkout.module.scss";

class Checkout extends Component {
  componentDidMount() {
    this.props.getCheckoutListAction();
  }

  getData = (val, type) => {
    const res = { ...val, type };
    this.props.updateCounterCheckoutAction(res);
  };

  handleProceedButton = () => {
    const { history, updateOrderListAction, checkoutList } = this.props;
    const itemPayload = checkoutList.map((item) =>
      Object.assign(
        {},
        { itemName: item.name, itemId: item.counterId, quantity: item.quantity }
      )
    );
    const totalCost = checkoutList
      .map((item) => item.cost)
      .reduce((sum, current) => sum + current, 0);

    updateOrderListAction({ itemPayload: [...itemPayload], totalCost });
    history.push("/address");
  };

  render() {
    const { checkoutList, removeCheckoutListAction } = this.props;
    let checkoutCost = 0;
    checkoutList.map((checkoutItem) => (
      checkoutCost += checkoutItem.cost
    ))
    console.log("Item cost:", checkoutCost)
    return (
      <div className={styles.checkoutMainContainer}>
        <div className={styles.headerContainer}>
          <h3>Checkout Items</h3>
          <Button
            className={styles.editButtonStyle}
            variant="secondary"
            onClick={() => {
              (checkoutList && checkoutList.length === 0) ||
              checkoutList === undefined
                ? notifyErrorToast(
                    "Please add at least one item before proceeding"
                  )
                : (checkoutCost < 250
                    ? notifyErrorToast(
                      "Total order price should be more than Rs 250"
                    ): this.handleProceedButton()
                  ) 
            }}
          >
            Proceed to Buy
          </Button>
        </div>
        {checkoutList && checkoutList.length > 0 ? (
          checkoutList.map((checkoutItem) => (
            <CheckoutCard
              key={checkoutItem.counterId}
              counterId={checkoutItem.counterId}
              imgSrc={checkoutItem.imgSrc}
              title={checkoutItem.name}
              description={checkoutItem.type}
              cost={checkoutItem.cost}
              quantity={checkoutItem.quantity}
              sendQuantityData={(v) => this.getData(v, checkoutItem.type)}
              onClickRemove={(counterId, type) =>
                removeCheckoutListAction(counterId, type)
              }
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}

        <br />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getCheckoutListAction,
  removeCheckoutListAction,
  updateCounterCheckoutAction,
  updateOrderListAction,
};

const mapStateToProps = ({ checkoutListReducer: checkoutListState }) => {
  return { checkoutList: checkoutListState.checkoutItems };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
