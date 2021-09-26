import React, { Component } from "react";
import config from "utils/config";
import { connect } from "react-redux";

import styles from "./vendorList.module.scss";

import {
  getProductCategoryAction,
  getProductItemAction,
  spinnerAction,
  setVendorIdAction,
} from "actions";

class VendorList extends Component {
  render() {
    const {
      vendorPayload,
      getProductItemAction,
      getProductCategoryAction,
      spinnerAction,
      setVendorIdAction,
    } = this.props;

    return (
      <div className={styles.mainVendorCardContainer}>
        {vendorPayload &&
          vendorPayload.map((item, index) => {
            const { name, _id } = item[0].user_id;
            return (
              <div
                key={index}
                className={styles.vendorListCardContainer}
                onClick={() => {
                  const isDataAdded = new Promise((resolve, reject) => {
                    localStorage.setItem(config.VENDOR_ID, _id);
                    resolve();
                  });
                  isDataAdded.then(() => {
                    this.props.handleVendorToggle();
                    spinnerAction(true);
                    setVendorIdAction(_id);
                    getProductCategoryAction(_id);
                    getProductItemAction(_id, spinnerAction);
                  });
                }}
              >
                <h4 className={styles.vendorListNameStyle}>{name}</h4>
                {/* <h4 className={styles.vendorListCardStyle}>{mobile}</h4>
                <h4 className={styles.vendorListCardStyle}>{email}</h4> */}
              </div>
            );
          })}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getProductItemAction,
  getProductCategoryAction,
  spinnerAction,
  setVendorIdAction,
};

export default connect(null, mapDispatchToProps)(VendorList);
