import React, { Component } from "react";

import { Formik, Form, Field } from "formik";

import { connect } from "react-redux";

import { updateUserPassword, spinnerAction } from "actions";

import InputField from "components/Input";
import Button from "components/Button";

import { ChangePasswordSchema } from "utils/formValidation";
import Constants from "utils/constants";

import EndpointMessage from "components/EndpointMessage";

import styles from "./changePassword.module.scss";

class ChangePasswordForm extends Component {
  renderSubmitButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        Submit
      </Button>
    );
  };

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  render() {
    const { apiError, userPayload, updateUserPassword } = this.props;

    const form = {
      oldPassword: "",
      password: "",
    };

    return (
      <>
        <Formik
          initialValues={form}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values) => {
            this.handleSpinner(true);
            updateUserPassword(this.handleSpinner, values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h4>Change Password</h4>

                <Field
                  id="outlined-oldPassword-input"
                  type="password"
                  placeholder="Enter Password"
                  name="oldPassword"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

                <Field
                  id="outlined-password-input"
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="password"
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
  updateUserPassword,
  spinnerAction,
};

const mapStateToProps = ({ userReducer: userState }) => {
  const { userPayload } = userState;

  return {
    fetching: userState.fetching,
    apiError: userState.apiError,
    userPayload: userPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
