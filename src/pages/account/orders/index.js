import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";

import { getOrderAction, spinnerAction } from "actions";

import AccountNavBar from "pages/account/accountNavBar";
import AccountHeader from "pages/account/accountHeader";
import OrderCard from "components/OrderCard";

import styles from "./orders.module.scss";

class Orders extends Component {
  handleSpinner = (flag) => this.props.spinnerAction(flag);
  componentDidMount() {
    this.handleSpinner(true);
    this.props.getOrderAction(this.handleSpinner);
  }
  render() {
    const {
      location: { pathname },
      customerOrder,
    } = this.props;
    const routeName = pathname.replace("/", "");

    return (
      <div>
        <AccountHeader routeName={routeName} />
        <div className={styles.mainContainer}>
          <AccountNavBar />
          <div className={styles.orderContainer}>
            <h3>Orders</h3>
            {customerOrder && customerOrder.length !== 0 ? (
              customerOrder.map(
                ({
                  _id,
                  delivery_status,
                  payment,
                  order_date,
                  orderItem,
                  created_on,
                  order_uid,
                }) => {
                  return (
                    <OrderCard
                      key={_id}
                      id={order_uid}
                      status={delivery_status.status}
                      items={orderItem.map((item) =>
                        Object.assign(
                          {},
                          {
                            itemName: item.itemName,
                            itemQuantity: item.quantity,
                          }
                        )
                      )}
                      price={payment.amount.toFixed(2)}
                      paymentType={payment.instrument}
                      orderDate={moment(created_on).format("YYYY-MM-DD")}
                      eta={order_date}
                    />
                  );
                }
              )
            ) : (
              <h1 className={styles.alignCenter}>No Order Placed!</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  spinnerAction,
  getOrderAction,
};

const mapStateToProps = ({ orderReducer }) => {
  return {
    customerOrder: orderReducer?.customerOrder?.result?.result,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
