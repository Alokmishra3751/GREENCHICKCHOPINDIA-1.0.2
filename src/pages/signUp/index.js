import React, { Component } from "react";
import { connect } from "react-redux";

import { signupAction } from "actions";

import { isUserAuthenticated } from "utils/helperFucntion";

import SignUpForm from "./signUpForm.js";

import styles from "./signUp.module.scss";

class SignUp extends Component {
  componentDidMount() {
    const { history } = this.props;
    isUserAuthenticated(history);
  }
  render() {
    const {
      signupAction,
      fetching,
      apiError,
      userPayload,
      history,
    } = this.props;
    return (
      <div className={styles.signUpMainContainer}>
        <SignUpForm
          signupAction={signupAction}
          fetching={fetching}
          apiError={apiError}
          userPayload={userPayload}
          history={history}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  signupAction,
};

const mapStateToProps = ({ signupReducer: signUpState }, props) => {
  const { userPayload } = signUpState;

  return {
    fetching: signUpState.fetching,
    apiError: signUpState.apiError,
    userPayload: userPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
