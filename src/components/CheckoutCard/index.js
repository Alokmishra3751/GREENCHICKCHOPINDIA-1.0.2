import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "components/Button";
import QuantityCounter from "components/QuantityCounter";

import styles from "./checkoutCard.module.scss";

export default class CheckoutCard extends Component {
  renderLeftContentContainer = (
    title,
    description,
    onClickRemove,
    counterId
  ) => (
    <div className={styles.checkoutCardLeftContent}>
      <div>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </div>
      <Button
        className={styles.checkoutButtonStyle}
        variant="secondary"
        onClick={() => onClickRemove(counterId, description)}
      >
        Remove
      </Button>
    </div>
  );

  renderLeftContainer = (
    imgSrc,
    title,
    description,
    onClickRemove,
    counterId
  ) => (
    <div className={styles.checkoutCardLeftContainer}>
      <img src={imgSrc} alt="food" className={styles.checkoutCardImageStyle} />
      {this.renderLeftContentContainer(
        title,
        description,
        onClickRemove,
        counterId
      )}
    </div>
  );

  renderRightContainer = (cost) => {
    const { counterId, sendQuantityData, quantity } = this.props;
    return (
      <div className={styles.checkoutCardRightContainer}>
        <QuantityCounter
          counterId={counterId}
          sendQuantityData={sendQuantityData}
          quantity={quantity}
        />
        <h2 className={styles.checkoutCardCostStyle}>₹ {cost}</h2>
      </div>
    );
  };

  render() {
    const {
      imgSrc,
      title,
      description,
      cost,
      onClickRemove,
      counterId,
    } = this.props;

    return (
      <div className={styles.checkoutCardContainer}>
        <div className={styles.checkoutCardSubContainer}>
          {this.renderLeftContainer(
            imgSrc,
            title,
            description,
            onClickRemove,
            counterId
          )}
          {this.renderRightContainer(cost)}
        </div>
      </div>
    );
  }
}

CheckoutCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  cost: PropTypes.number.isRequired,
  sendQuantityData: PropTypes.func,
  counterId: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};
