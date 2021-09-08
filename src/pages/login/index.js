import React, { Component } from "react";

import { connect } from "react-redux";

import { loginAction, otpLoginAction } from "actions";

import { isUserAuthenticated } from "utils/helperFucntion";

import styles from "./login.module.scss";

import LoginForm from "./loginForm";

class Login extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userPayload !== this.props.userPayload) {
      const { history, userPayload } = this.props;

      userPayload && userPayload.success && history.replace("/");
    }
  }

  componentDidMount() {
    const { history } = this.props;
    isUserAuthenticated(history);
  }

  render() {
    const {
      loginAction,
      fetching,
      apiError,
      userPayload,
      otpLoginAction,
    } = this.props;
    return (
      <div className={styles.loginMainContainer}>
        <LoginForm
          loginAction={loginAction}
          otpLoginAction={otpLoginAction}
          fetching={fetching}
          apiError={apiError}
          userPayload={userPayload}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginAction,
  otpLoginAction,
};

const mapStateToProps = ({ loginReducer: loginState }, props) => {
  const { loggedInUser } = loginState;

  return {
    fetching: loginState.fetching,
    apiError: loginState.apiError,
    userPayload: loggedInUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
