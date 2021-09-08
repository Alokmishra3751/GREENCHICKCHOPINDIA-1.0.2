import React, { Component } from "react";

import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";

import { resetUserPasswordAction, spinnerAction } from "actions";

import InputField from "components/Input";
import Button from "components/Button";

import { ResetPasswordSchema } from "utils/formValidation";
import Constants from "utils/constants";

import EndpointMessage from "components/EndpointMessage";

import styles from "./resetPassword.module.scss";

class ResetPasswordForm extends Component {
  renderSubmitButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        Submit
      </Button>
    );
  };

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  render() {
    const {
      apiError,
      userPayload,
      resetUserPasswordAction,
      resetId,
      history,
    } = this.props;

    const form = {
      password: "",
      confirmPassword: "",
    };

    return (
      <>
        <Formik
          initialValues={form}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values, { resetForm }) => {
            this.handleSpinner(true);
            resetUserPasswordAction(
              this.handleSpinner,
              values,
              resetId,
              resetForm,
              history
            );
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h4>Reset Password</h4>

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
                  id="outlined-confirmPassword-input"
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
                      userPayload.result.error) ||
                    Constants.ERROR_MESSAGE
                  }
                />
                {this.renderSubmitButton()}
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapDispatchToProps = {
  resetUserPasswordAction,
  spinnerAction,
};

const mapStateToProps = ({ userReducer: userState }) => {
  const { resetPasswordPayload } = userState;

  return {
    fetching: userState.fetching,
    apiError: userState.apiError,
    userPayload: resetPasswordPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
