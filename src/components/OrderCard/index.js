import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./orderCard.module.scss";

export default class OrderCard extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const {
      id,
      status,
      items,
      price,
      paymentType,
      orderDate,
      eta,
    } = this.props;

    const _renderOrderCardHeader = () => (
      <div className={styles.orderCardHeaderContainer}>
        <h4>Order Id: {id}</h4>
        <h4>Status: {this.capitalizeFirstLetter(status.toLowerCase())}</h4>
      </div>
    );

    const _renderItemList = (items) =>
      items.map((item) => (
        <div key={item.itemName} className={styles.orderCardRowItemContainer}>
          <h4>{item.itemName}</h4>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "4px" }}>x</h4>
            <h4>{item.itemQuantity}</h4>
          </div>
        </div>
      ));

    const _renderUpperContent = () => (
      <div className={styles.orderCardUpperContentContainer}>
        <div className={styles.orderCardItemContainer}>
          {_renderItemList(items)}
        </div>
        <div className={styles.orderCardPaymentContainerStyle}>
          <h4>INR {price}</h4>
          <h4 className={styles.orderCardPaymentStyle}>
            Payment: {paymentType}{" "}
          </h4>
        </div>
      </div>
    );

    const _renderLowerContent = () => (
      <div className={styles.orderCardLowerContentContainer}>
        <h4>Order Date: {orderDate}</h4>
        <h4>ETA: {eta}</h4>
      </div>
    );

    return (
      <div className={styles.orderCardContainer}>
        {_renderOrderCardHeader()}
        <div className={styles.orderCardContentContainer}>
          {_renderUpperContent()}
          {_renderLowerContent()}
        </div>
      </div>
    );
  }
}

OrderCard.protoTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  paymentType: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  eta: PropTypes.string.isRequired,
};
