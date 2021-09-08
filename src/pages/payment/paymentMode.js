import React, { Component } from "react";
import { Formik, Form, Field } from "formik";

import RadioButton from "components/RadioButton";

import styles from "./payment.module.scss";

export default class PaymentMode extends Component {
  render() {
    const {
      formData: { offline, online },
      handlePaymentMode,
    } = this.props;
    const form = {
      online,
      offline,
    };
    return (
      <div className={styles.modeContainer}>
        <Formik initialValues={form}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                {/* <Field
                  component={RadioButton}
                  id="1"
                  label="Continue to Payment Gateway"
                  name="online"
                  value={online}
                  onChange={() => handlePaymentMode(true, false)}
                /> */}
                <br />
                <Field
                  component={RadioButton}
                  id="2"
                  label="Cash On Delivery"
                  name="offline"
                  value={offline}
                  onChange={() => handlePaymentMode(false, true)}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
