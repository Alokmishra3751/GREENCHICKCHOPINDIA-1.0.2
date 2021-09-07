import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import Button from "components/Button";

import {
  updateOrderListAction,
  getDeliveryDateAction,
  spinnerAction,
} from "actions";

import styles from "./deliveryTimeslot.module.scss";
import { notifyErrorToast } from "utils/helperFucntion";

class DeliveryTimeslot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDeliveryDate: "",
      selectedDeliveryTime: {},
    };
  }

  componentDidMount() {
    const { spinnerAction, getDeliveryDateAction } = this.props;
    spinnerAction(true);
    getDeliveryDateAction(spinnerAction);
  }

  isDeliveryTimeAvailable = (startTime, endTime) => {
    const { selectedDeliveryDate } = this.state;
    const iscurrentDate = moment(selectedDeliveryDate).isSame(moment(), "day");
    return iscurrentDate
      ? moment(new Date(), "hh:mm:ss").valueOf() <
          moment(endTime, "hh:mm:ss").valueOf()
      : true;
  };
  formatTime = (deliveryTime) => moment(deliveryTime, ["HH"]).format("hh A");

  render() {
    const { selectedDeliveryDate, selectedDeliveryTime } = this.state;
    const { deliveryPayload } = this.props;

    const getDateList = () => {
      const days = [];
      const dateStart = moment();
      const dateEnd = moment().add(4, "days");
      while (dateEnd.diff(dateStart, "days") >= 0) {
        days.push(dateStart.format("YYYY-MM-DD"));
        dateStart.add(1, "days");
      }
      return days;
    };

    const renderDateSlot = () => {
      const dates = getDateList();

      return (
        <div className={styles.dateRowContainer}>
          {dates.map((item, index) => {
            const isDatePassed = moment(item).isBefore(moment(), "day");

            return (
              !isDatePassed && (
                <div
                  style={
                    selectedDeliveryDate === item
                      ? {
                          border: "1px solid #ea1a20",
                          backgroundColor: "#ea1a20",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => {
                    !isDatePassed &&
                      this.setState({
                        selectedDeliveryDate: item,
                        selectedDeliveryTime: {},
                      });
                  }}
                  key={index}
                  className={styles.dateContainer}
                >
                  <h5 className={styles.dateStyle}>{item}</h5>
                </div>
              )
            );
          })}
        </div>
      );
    };

    const renderStartAndEndTime = (shouldTimeVisible, deliveryTime, index) => (
      <h5
        className={styles.dateStyle}
        style={
          !shouldTimeVisible
            ? {
                color: "#bebebe",
              }
            : {}
        }
      >
        {this.formatTime(deliveryTime.start_time)} TO{" "}
        {index === 4
          ? this.formatTime("21:00:00")
          : this.formatTime(deliveryTime.end_time)}
      </h5>
    );

    const renderTimeSlot = () => (
      <div className={styles.timeSlotContainer}>
        {deliveryPayload &&
          deliveryPayload[0].delivery_time_slot.map((deliveryTime, index) => {
            const shouldTimeVisible = this.isDeliveryTimeAvailable(
              deliveryTime.start_time,
              deliveryTime.end_time
            );

            return (
              <div
                onClick={() => {
                  shouldTimeVisible
                    ? this.setState({
                        selectedDeliveryTime: deliveryTime,
                      })
                    : notifyErrorToast("Time slot not available!!", 500);
                }}
                key={index}
                className={styles.dateContainer}
                style={
                  !shouldTimeVisible
                    ? {
                        cursor: "unset",
                        border: "1px solid #bebebe",
                      }
                    : selectedDeliveryTime.start_time ===
                      deliveryTime.start_time
                    ? {
                        border: "1px solid #ea1a20",
                        backgroundColor: "#ea1a20",
                        color: "white",
                      }
                    : {}
                }
              >
                {renderStartAndEndTime(shouldTimeVisible, deliveryTime, index)}
              </div>
            );
          })}
      </div>
    );

    const { updateOrderListAction, history, orderPayload } = this.props;
    return (
      <div className={styles.deliveryMainContainer}>
        <div className={styles.headerContainer}>
          <h3>Delivery Time</h3>
        </div>
        <div className={styles.timeContainer}>
          <h3>Choose a delivery time</h3>
          {renderDateSlot()}
          {selectedDeliveryDate && renderTimeSlot()}
          {selectedDeliveryDate && selectedDeliveryTime.start_time && (
            <Button
              type="submit"
              variant="primary"
              className={styles.proceedButtonStyle}
              onClick={() => {
                updateOrderListAction({
                  ...orderPayload,
                  delieveryDate: selectedDeliveryDate,
                  delieveryTime: {
                    startTime: selectedDeliveryTime.start_time,
                    endTime: selectedDeliveryTime.end_time,
                  },
                });
                history.push("/payment");
              }}
            >
              Proceed
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateOrderListAction,
  getDeliveryDateAction,
  spinnerAction,
};

const mapStateToProps = ({ localOrderReducer, orderReducer }) => {
  return {
    orderPayload: localOrderReducer.orderDetails,
    deliveryPayload: orderReducer?.deliveryPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryTimeslot);
