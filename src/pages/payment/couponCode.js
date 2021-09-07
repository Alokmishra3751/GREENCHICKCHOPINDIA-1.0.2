import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";

import { getCouponCodeAction, spinnerAction } from "actions";

import InputField from "components/Input";
import Button from "components/Button";

import styles from "./payment.module.scss";

class CouponCode extends Component {
  renderSubmitButton = (value) => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        Apply
      </Button>
    );
  };

  render() {
    const {
      couponCode,
      handleCouponCode,
      getCouponCodeAction,
      spinnerAction,
    } = this.props;

    const form = {
      coupon: couponCode,
    };
    return (
      <div
        className={styles.modeContainer}
        style={{
          margin: "10px 0px 40px -40px",
        }}
      >
        <Formik
          initialValues={form}
          onSubmit={(values, { resetForm }) => {
            handleCouponCode("");
            spinnerAction(true);
            getCouponCodeAction(values, spinnerAction);
            resetForm();
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.couponFormContainer}>
                <Field
                  id="outlined-coupon-input"
                  type="text"
                  placeholder="Add Coupon Code"
                  name="coupon"
                  containerClassname={styles.containerStyle}
                  onTextChange={(couponCode) => {
                    handleCouponCode(couponCode);
                  }}
                  inputClassName={styles.inputStyle}
                  component={InputField}
                  isRequired
                />
                {this.renderSubmitButton()}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getCouponCodeAction,
  spinnerAction,
};

export default connect(null, mapDispatchToProps)(CouponCode);
