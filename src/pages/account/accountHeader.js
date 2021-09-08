import React, { Component } from "react";

import styles from "./account.module.scss";

export default class AccountHeader extends Component {
  render() {
    const { routeName } = this.props;
    return (
      <div className={styles.accountHeaderContainer}>
        <h4>Home / {routeName}</h4>
      </div>
    );
  }
}
