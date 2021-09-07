import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";

import { verifyOtpAction, resendOtpAction, spinnerAction } from "actions";

import InputField from "components/Input";
import Button from "components/Button";

import { OtpSchema } from "utils/formValidation";

import styles from "./verifyOtp.module.scss";

class VerifyOtp extends Component {
  renderSubmitButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        Submit
      </Button>
    );
  };

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  render() {
    const { verifyOtpAction, resendOtpAction } = this.props;
    const form = {
      otp: "",
    };

    return (
      <div className={styles.mainContainer}>
        <Formik
          initialValues={form}
          validationSchema={OtpSchema}
          onSubmit={(values, { resetForm }) => {
            this.handleSpinner(true);
            verifyOtpAction(values, this.handleSpinner, this.props.history);
            resetForm();
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h4>Verify OTP</h4>
                <Field
                  id="outlined-otp-input"
                  type="otp"
                  placeholder="Enter Otp"
                  name="otp"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

                <Button
                  type="button"
                  variant="primary"
                  className={styles.resendButtonStyle}
                  onClick={() => {
                    this.handleSpinner(true);
                    resendOtpAction(this.handleSpinner);
                  }}
                >
                  Resend Otp
                </Button>
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
  verifyOtpAction,
  spinnerAction,
  resendOtpAction,
};

const mapStateToProps = ({ otpReducer }) => {
  return {
    fetching: otpReducer.fetching,
    apiError: otpReducer.apiError,
    otpPayload: otpReducer?.verifyOtpPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
