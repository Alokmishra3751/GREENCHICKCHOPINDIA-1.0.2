import React, { Component } from "react";

import { Formik, Form, Field } from "formik";

import InputField from "components/Input";
import Button from "components/Button";
import Spinner from "components/Spinner";
import EndpointMessage from "components/EndpointMessage";

import { SignUpSchema } from "utils/formValidation";
import Constants from "utils/constants";

import styles from "./signUp.module.scss";

export default class SignUpForm extends Component {
  renderSignUpButton = () => {
    const { fetching } = this.props;
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        {fetching ? <Spinner scale={0.4} color="#ea1a20" /> : "Sign Up"}
      </Button>
    );
  };

  render() {
    const { apiError, userPayload, signupAction } = this.props;

    const form = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    };

    const handleApiCall = (values) => {
      signupAction(values).then(() => {
        this.props.history.push("/verifyOtp");
      });
    };

    return (
      <>
        <Formik
          initialValues={form}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            handleApiCall(values);
          }}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h4>SIGN UP</h4>
                <Field
                  id="outlined-name-input"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

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
                  id="outlined-mobile-input"
                  type="text"
                  placeholder="Enter Phone Number"
                  name="mobile"
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

                <Field
                  id="outlined-confirm-password-input"
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />
                <EndpointMessage
                  errorFlag={(userPayload && !userPayload.success) || apiError}
                  endpointMessage={
                    (userPayload &&
                    userPayload.result &&
                    typeof userPayload.result.error === "string"
                      ? userPayload.result.error
                      : "") || Constants.ERROR_MESSAGE
                  }
                />
                {this.renderSignUpButton()}
              </div>
            </Form>
          )}
        />
      </>
    );
  }
}
