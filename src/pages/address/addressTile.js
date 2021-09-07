import React, { Component } from "react";
import { connect } from "react-redux";

import AddressCard from "components/AddressCard";

import { updateOrderListAction } from "actions";

import styles from "./address.module.scss";

class AddressTile extends Component {
  render() {
    const {
      addressList,
      userName,
      history,
      updateOrderListAction,
      orderPayload,
    } = this.props;

    return (
      <>
        <div className={styles.addressTileMainContainer}>
          <div className={styles.addressTileContainer}>
            {addressList &&
            addressList?.result?.result &&
            addressList?.result?.result.length !== 0 ? (
              addressList?.result?.result.map(
                (
                  { address, landmark, city, state, pin_code },
                  index,
                  array
                ) => (
                  <AddressCard
                    key={index}
                    name={userName}
                    address={address}
                    landmark={landmark}
                    state={state}
                    city={city}
                    handleOnClick={() => {
                      const addressPayload = {
                        address,
                        city,
                        state,
                        pincode: pin_code,
                      };

                      updateOrderListAction({
                        ...orderPayload,
                        selectedAddress: { ...addressPayload },
                      });
                      history.push("/deliveryTimeslot");
                    }}
                  />
                )
              )
            ) : (
              <div
                style={{
                  height: "200px",
                  width: "100%",
                  marginLeft: "-20px",
                }}
              >
                <h3>Please add at least one address.</h3>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  updateOrderListAction,
};

const mapStateToProps = ({ localOrderReducer }) => {
  return {
    orderPayload: localOrderReducer.orderDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressTile);
