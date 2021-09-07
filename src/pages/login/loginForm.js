/* eslint-disable react/no-unescaped-entities */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CoolTabs from "react-cool-tabs";

import { Formik, Form, Field } from "formik";

import InputField from "components/Input";
import Button from "components/Button";
import Spinner from "components/Spinner";
import EndpointMessage from "components/EndpointMessage";
import { notifyErrorToast, notifySuccessToast } from "utils/helperFucntion";
import { LoginSchema, OTPLoginSchema } from "utils/formValidation";
import Constants from "utils/constants";

import styles from "./login.module.scss";
import agent from "services/agent";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOtpReceived: false,
    };
  }

  renderLoginButton = (submitForm) => {
    const { fetching } = this.props;
    return (
      <Button
        onClick={submitForm}
        variant="primary"
        className={styles.buttonStyle}
      >
        {fetching ? <Spinner scale={0.4} color="#ea1a20" /> : "Login"}
      </Button>
    );
  };

  renderCreateAccountButton = () => {
    const { history } = this.props;
    return (
      <Button
        onClick={() => history.push("/signUp")}
        type="submit"
        variant="primary"
        className={styles.buttonStyle}
      >
        Create Account
      </Button>
    );
  };

  sendOtp = (phoneNumber) => {
    if (phoneNumber.length !== 0) {
      agent.Auth.sendOtp(phoneNumber)
        .then((response) => {
          if (response.data.success === false) {
            notifyErrorToast(response.data.result.error);
          } else if (response.data.success === true) {
            this.setState({
              isOtpReceived: true,
            });
          }
        })
        .catch(() =>
          notifyErrorToast("Something went wrong while sending OTP!!")
        );
    }
  };

  resendOtp = (phoneNumber) => {
    const mobile = Number(phoneNumber);
    if (phoneNumber.length !== 0) {
      agent.Otp.resendOtp({
        mobile: mobile,
      })
        .then((response) => {
          if (response.data.success === false) {
            notifyErrorToast(response.data.result.error);
          } else if (response.data.success === true) {
            notifySuccessToast("OTP sent successfully!!");
          }
        })
        .catch(() =>
          notifyErrorToast("Something went wrong while sending OTP!!")
        );
    }
  };

  render() {
    const { apiError, userPayload, loginAction, otpLoginAction } = this.props;
    const { isOtpReceived } = this.state;
    const form = {
      email: "",
      password: "",
    };

    const mobileForm = {
      phoneNumber: "",
      otp: "",
    };

    const handleApiCall = (values) => {
      loginAction(values);
    };

    const handleOTPApiCall = (values) => {
      otpLoginAction(values);
    };

    const renderEmailLogin = () => (
      <Formik
        initialValues={form}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleApiCall(values);
        }}
      >
        {({ handleSubmit, submitForm }) => (
          <Form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Field
              id="outlined-email-input"
              type="email"
              placeholder="Enter Email"
              name="email"
              containerClassname={styles.containerStyle}
              inputClassName={styles.inputClassName}
              component={InputField}
              isRequired
            />

            <Field
              id="outlined-password-input"
              type="password"
              placeholder="Enter Password"
              name="password"
              containerClassname={styles.containerStyle}
              inputClassName={styles.inputClassName}
              component={InputField}
              isRequired
            />
            {this.renderLoginButton(submitForm)}
          </Form>
        )}
      </Formik>
    );

    const renderOtpLogin = () => (
      <Formik
        initialValues={mobileForm}
        validationSchema={OTPLoginSchema}
        onSubmit={(values) => {
          handleOTPApiCall(values);
        }}
      >
        {({ handleSubmit, submitForm, values }) => (
          <Form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Field
              id="outlined-number-input"
              type="text"
              placeholder="Enter Mobile Number"
              name="phoneNumber"
              containerClassname={styles.containerStyle}
              inputClassName={styles.inputClassName}
              component={InputField}
              isRequired
            />

            {isOtpReceived ? (
              <>
                <Field
                  id="outlined-otp-input"
                  type="text"
                  placeholder="Enter OTP"
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
                  onClick={() => this.resendOtp(values.phoneNumber)}
                >
                  Resend Otp
                </Button>
                {this.renderLoginButton(submitForm)}
              </>
            ) : (
              <Button
                onClick={() => this.sendOtp(values.phoneNumber)}
                variant="primary"
                className={styles.buttonStyle}
              >
                Send OTP
              </Button>
            )}
          </Form>
        )}
      </Formik>
    );

    return (
      <div className={styles.formContainer}>
        <h4 className={styles.formHeaderStyle}>Login Page</h4>
        <CoolTabs
          tabKey={"1"}
          className={styles.formTabContainer}
          activeTabStyle={{
            background: "#ea1a20",
            color: "white",
            fontWeight: "600",
          }}
          tabsHeaderStyle={{
            display: "flex",
            justifyContent: "center",
          }}
          leftTabStyle={{
            width: "40%",
          }}
          rightTabStyle={{
            width: "40%",
          }}
          unActiveTabStyle={{
            fontWeight: "600",
          }}
          leftContentStyle={
            isOtpReceived
              ? {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "50px",
                  alignItems: "center",
                }
          }
          rightContentStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          leftTabTitle={"Mobile Login"}
          rightTabTitle={"Email Login"}
          leftContent={renderOtpLogin()}
          rightContent={renderEmailLogin()}
        />

        <EndpointMessage
          errorFlag={(userPayload && !userPayload.success) || apiError}
          endpointMessage={
            (userPayload && userPayload.result && userPayload.result.error) ||
            Constants.ERROR_MESSAGE
          }
        />
        <div className={styles.loginFooter}>
          <div>
            <p className={styles.loginFooterTextStyle}>
              Don't have an account?
            </p>

            {this.renderCreateAccountButton()}
          </div>
          <Link to="/forgetPassword"> Forget Password? </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
