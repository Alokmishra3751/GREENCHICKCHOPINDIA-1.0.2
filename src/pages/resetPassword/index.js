import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ResetPasswordForm from "./resetPasswordForm";

import styles from "./resetPassword.module.scss";

class ResetPassword extends Component {
  render() {
    const {
      history,
      match: {
        params: { resetId },
      },
    } = this.props;

    return (
      <div className={styles.formMainContainer}>
        <ResetPasswordForm resetId={resetId} history={history} />
      </div>
    );
  }
}

export default withRouter(ResetPassword);
