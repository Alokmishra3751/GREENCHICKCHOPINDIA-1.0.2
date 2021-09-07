import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateCheckoutListAction } from "actions";

import Button from "components/Button";
import QuantityCounter from "components/QuantityCounter";
import styles from "./itemCard.module.scss";

class ItemCard extends Component {
  getData = (val, productPayload) => {
    const { updateCheckoutListAction } = this.props;
    updateCheckoutListAction({
      ...productPayload,
      quantity: val.quantity,
    });

    return val;
  };

  render() {
    const {
      title,
      subTitle,
      price,
      imgSrc,
      handleOnCardClick,
      handleOnButtonClick,
      itemKey,
      counterId,
      isMulti,
      checkoutList,
    } = this.props;

    const itemDetail = {
      cost: price,
      name: title,
      type: subTitle,
      imgSrc,
      counterId,
      isMulti: isMulti,
    };

    const getItem =
      checkoutList !== undefined
        ? checkoutList.filter((item) => item.counterId === counterId)
        : [];

    return (
      <div
        key={itemKey}
        onClick={handleOnCardClick}
        className={styles.itemCardContainer}
      >
        <img src={imgSrc} alt="item" className={styles.itemCardImageStyle} />
        <div className={styles.itemCardContentContainer}>
          <h5 className={styles.itemCardTitleStyle}>{title}</h5>
          <h5 className={styles.itemCardSubTitleStyle}>{subTitle}</h5>
          <div className={styles.itemCardFooterStyle}>
            <h5 className={styles.itemCardPriceStyle}>₹ {price}</h5>
            {getItem.length !== 0 && getItem.quantity !== 1 ? (
              <QuantityCounter
                quantity={getItem[0].quantity}
                sendQuantityData={(val) => this.getData(val, itemDetail)}
                counterId={counterId}
                quantityHeaderStyle={styles.itemDetailQuantityStyle}
                quantityBoxStyle={styles.itemDetailQuantityBoxStyle}
                quantityContainer={styles.itemDetailQuantityContainer}
              />
            ) : (
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  handleOnButtonClick(itemDetail);
                }}
              >
                ADD TO CART
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateCheckoutListAction,
};

const mapStateToProps = ({ checkoutListReducer: checkoutListState }) => {
  return { checkoutList: checkoutListState.checkoutItems };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);

ItemCard.protoTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  price: PropTypes.string.isRequired,
  handleOnButtonClick: PropTypes.func.isRequired,
  handleOnCardClick: PropTypes.func.isRequired,
};
