import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";

import { forgetUserPasswordAction, spinnerAction } from "actions";

import InputField from "components/Input";
import Button from "components/Button";
import EndpointMessage from "components/EndpointMessage";

import { ForgetPasswordSchema } from "utils/formValidation";
import Constants from "utils/constants";

import styles from "./forgetPassword.module.scss";

class ForgetPassword extends Component {
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
      forgetPasswordPayload: userPayload,
      forgetUserPasswordAction,
    } = this.props;
    const form = {
      email: "",
    };

    return (
      <div className={styles.mainContainer}>
        <Formik
          initialValues={form}
          validationSchema={ForgetPasswordSchema}
          onSubmit={(values, { resetForm }) => {
            this.handleSpinner(true);
            forgetUserPasswordAction(this.handleSpinner, values, resetForm);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h4>Forget Password</h4>
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
      </div>
    );
  }
}

const mapDispatchToProps = {
  forgetUserPasswordAction,
  spinnerAction,
};

const mapStateToProps = ({ userReducer: userState }) => {
  const { forgetPasswordPayload } = userState;

  return {
    fetching: userState.fetching,
    apiError: userState.apiError,
    forgetPasswordPayload: forgetPasswordPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
