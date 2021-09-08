import React, { Component } from "react";

import AccountNavBar from "pages/account/accountNavBar";
import AccountHeader from "pages/account/accountHeader";

import ChangePasswordForm from "./changePasswordForm";

import styles from "./changePassword.module.scss";

export default class ChangePassword extends Component {
  render() {
    const {
      location: { pathname },
    } = this.props;
    const routeName = pathname.replace("/", "");
    return (
      <div>
        <AccountHeader routeName={routeName} />
        <div className={styles.mainContainer}>
          <AccountNavBar />
          <div className={styles.formMainContainer}>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    );
  }
}
