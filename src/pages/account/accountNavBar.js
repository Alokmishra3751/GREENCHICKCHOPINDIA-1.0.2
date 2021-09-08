import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import classNames from "classnames";

import config from "utils/config";

import { isVendorSelected } from "utils/helperFucntion";
import { logoutAction, spinnerAction } from "actions";

import { loadState, saveState } from "services/localStorage";

import Button from "components/Button";

import styles from "./account.module.scss";

class AccountNavBar extends Component {
  handleSignOut = () => {
    const { history, logoutAction, spinnerAction } = this.props;
    spinnerAction(true);
    const vendorId = isVendorSelected();

    const persistedCheckoutItems = loadState();
    const isDataCleared = new Promise((resolve, reject) => {
      localStorage.clear();
      resolve();
    });
    isDataCleared.then(() => {
      localStorage.setItem(config.VENDOR_ID, vendorId);
      saveState(persistedCheckoutItems);
      logoutAction();
      delete axios.defaults.headers.common["Authorization"];
      spinnerAction(false);
      return history.replace("/");
    });
  };

  render() {
    const {
      history,
      location: { pathname },
    } = this.props;

    return (
      <div className={styles.linkContainer}>
        <Button
          className={
            /^(\/profile)/.test(pathname)
              ? classNames(styles.linkStyle, styles.linkBorder)
              : styles.linkStyle
          }
          variant="secondary"
          onClick={() => history.push("/profile")}
        >
          Profile
        </Button>

        <Button
          className={
            /^(\/order)/.test(pathname)
              ? classNames(styles.linkStyle, styles.linkBorder)
              : styles.linkStyle
          }
          variant="secondary"
          onClick={() => history.push("/order")}
        >
          Orders
        </Button>

        <Button
          className={
            /^(\/changePassword)/.test(pathname)
              ? classNames(styles.linkStyle, styles.linkBorder)
              : styles.linkStyle
          }
          variant="secondary"
          onClick={() => history.push("/changePassword")}
        >
          Change Password
        </Button>

        <Button
          className={styles.linkStyle}
          variant="secondary"
          onClick={this.handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    );
  }
}

const mapDisptachToProps = {
  logoutAction,
  spinnerAction,
};

export default withRouter(connect(null, mapDisptachToProps)(AccountNavBar));
