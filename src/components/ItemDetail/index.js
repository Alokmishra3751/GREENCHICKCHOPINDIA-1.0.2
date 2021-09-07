import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./itemDetail.module.scss";
import Button from "components/Button";
import QuantityCounter from "components/QuantityCounter";

export default class ItemDetail extends Component {
  renderItemDetailHeader = (packagingType) => {
    const { name } = this.props;
    return (
      <div className={styles.itemDetailHeaderContainer}>
        <h3>{name}</h3>
        <h5>{packagingType}</h5>
      </div>
    );
  };
  renderItemDetailFooter = (packagingType, itemcost) => {
    const {
      handleOnClick,
      cost,
      counterId,
      sendQuantityData,
      name,
      imgSrc,
      quantity,
      mulitPackage,
      handleSelectedPackage,
      selectedPackage,
      multiPrice,
    } = this.props;

    const itemDetail = {
      cost: itemcost,
      name,
      type: packagingType,
      imgSrc,
      counterId,
    };

    return (
      <div className={styles.itemDetailFooter}>
        {mulitPackage && mulitPackage.length !== 0 && (
          <div className={styles.multiPackageStyle}>
            {mulitPackage &&
              mulitPackage.map((item, index) => (
                <div
                  style={
                    selectedPackage === index
                      ? { backgroundColor: "#ea1a20", color: "white" }
                      : {}
                  }
                  onClick={() => handleSelectedPackage(index)}
                  className={styles.multiPackageItemStyle}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
        <h4 className={styles.itemDetailCostStyle}>
          {multiPrice && multiPrice.length !== 0
            ? `₹ ${multiPrice[selectedPackage]}`
            : `₹${cost}`}
        </h4>
        <div className={styles.itemDetailPurchaseContainer}>
          <QuantityCounter
            quantity={quantity}
            sendQuantityData={sendQuantityData}
            counterId={counterId}
            quantityHeaderStyle={styles.itemDetailQuantityStyle}
            quantityBoxStyle={styles.itemDetailQuantityBoxStyle}
            quantityContainer={styles.itemDetailQuantityContainer}
          />
          <Button onClick={() => handleOnClick(itemDetail)} variant="secondary">
            Add To Cart{" "}
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const {
      imgSrc,
      description,
      mulitPackage,
      type,
      selectedPackage,
      multiPrice,
      cost,
    } = this.props;
    const packagingType =
      mulitPackage && mulitPackage.length !== 0
        ? mulitPackage[selectedPackage]
        : type;
    const itemcost =
      multiPrice && multiPrice.length !== 0
        ? multiPrice[selectedPackage]
        : cost;
    return (
      <div className={styles.itemDetailContainer}>
        <div className={styles.itemDetailSubContainer}>
          <img
            src={imgSrc}
            alt="itemDetail"
            className={styles.itemDetailImageStyle}
          />
          <div className={styles.itemDetailContentContainer}>
            {this.renderItemDetailHeader(packagingType)}
            <p className={styles.itemDetailDescriptionStyle}>{description}</p>
            {this.renderItemDetailFooter(packagingType, itemcost)}
          </div>
        </div>
      </div>
    );
  }
}

ItemDetail.protoTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
  counterId: PropTypes.string.isRequired,
  sendQuantityData: PropTypes.func,
};
