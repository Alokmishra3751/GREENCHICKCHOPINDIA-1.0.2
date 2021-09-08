import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getUserInfoAction,
  getCustomerAddressAction,
  addCustomerAddressAction,
  spinnerAction,
} from "actions";

import Button from "components/Button";

import styles from "./address.module.scss";

import AddressForm from "./addressForm";
import AddressTile from "./addressTile";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  componentDidUpdate(prevProps) {
    if (prevProps.addressPayload !== this.props.addressPayload) {
      this.handleSpinner(true);
      this.props.getCustomerAddressAction(this.handleSpinner);
    }
  }

  componentDidMount() {
    const { getCustomerAddressAction, getUserInfoAction } = this.props;
    this.handleSpinner(true);
    getUserInfoAction(() => {});
    getCustomerAddressAction(this.handleSpinner);
  }

  toggleEditAddress = (flag) => this.setState({ isEdit: flag });

  renderAddButton = () => {
    return (
      <Button
        type="submit"
        variant="primary"
        className={styles.addressButtonStyle}
        onClick={() => this.toggleEditAddress(true)}
      >
        Add New
      </Button>
    );
  };
  render() {
    const { isEdit } = this.state;
    const {
      addressList,
      userName,
      fetching,
      addCustomerAddressAction,
      history,
    } = this.props;

    return (
      <div className={styles.addressMainContainer}>
        <div className={styles.headerContainer}>
          <h3>Select/Add Address </h3>
        </div>
        {!isEdit ? (
          <>
            <div className={styles.buttonContainer}>
              {this.renderAddButton()}
            </div>
            {!fetching ? (
              <AddressTile
                addressList={addressList}
                userName={userName}
                history={history}
              />
            ) : (
              <div
                style={{
                  height: "200px",
                }}
              />
            )}
          </>
        ) : (
          <AddressForm
            getCustomerAddressAction={getCustomerAddressAction}
            addCustomerAddressAction={addCustomerAddressAction}
            toggleEditAddress={this.toggleEditAddress}
            handleSpinner={this.handleSpinner}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getUserInfoAction,
  getCustomerAddressAction,
  addCustomerAddressAction,
  spinnerAction,
};

const mapStateToProps = ({
  addressReducer: addressState,
  userReducer: userState,
}) => {
  const { addressList, addressPayload } = addressState;

  return {
    fetching: addressState.fetching,
    apiError: addressState.apiError,
    addressList: addressList,
    addressPayload: addressPayload,
    userName: userState?.userInfoPayload?.result
      ? userState.userInfoPayload.result.name
      : "",
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
