import React, { Component } from "react";
import { connect } from "react-redux";

import VendorList from "./vendorList";

import LocationSearchInput from "./locationSearchInput";

import { getVendorAction, spinnerAction } from "actions";

import styles from "./header.module.scss";

class Location extends Component {
  render() {
    const { vendorPayload, getVendorAction, spinnerAction } = this.props;
    return (
      <div className={styles.storeLocationWrap}>
        {vendorPayload !== undefined &&
        vendorPayload?.success &&
        vendorPayload?.result?.result.length !== 0 ? (
          <div className={styles.vendorContainer}>
            
            <VendorList
              handleVendorToggle={this.props.handleVendorToggle}
              vendorPayload={vendorPayload && vendorPayload?.result?.result}
            />
          </div>
        ) : (
          <>
            <div className={styles.locationContainer}>
              <div className={styles.searchLocationContainer}>
                
                <LocationSearchInput
                  getVendorAction={getVendorAction}
                  spinnerAction={spinnerAction}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getVendorAction,
  spinnerAction,
};

const mapStateToProps = ({ vendorReducer }, props) => {
 
  document.body.style.overflowY = props.isVendorNotSelected
    ? "hidden"
    : "unset";
  return {
    vendorPayload: vendorReducer?.vendorPayload
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
