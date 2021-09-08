import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./address.module.scss";

export default class AddressCard extends Component {
  render() {
    const { name, address, landmark, handleOnClick, state, city } = this.props;
    return (
      <div className={styles.addressCardContainer} onClick={handleOnClick}>
        <h4 className={styles.addressNameStyle}>{name}</h4>
        <h4 className={styles.addressCardAddressStyle}>{address}</h4>
        <h4 className={styles.addressCardAddressStyle}>
          {state} , {city}
        </h4>
        {landmark && (
          <h4 className={styles.addressCardLandmarkStyle}>
            Landmark: {landmark}
          </h4>
        )}
      </div>
    );
  }
}

AddressCard.protoTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  landmark: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
};
