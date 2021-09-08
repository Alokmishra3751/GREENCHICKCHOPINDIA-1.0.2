import React from "react";
import PropTypes from "prop-types";
import styles from "./endpointMessage.module.scss";

function EndpointMessage({ endpointMessage, errorFlag }) {
  return errorFlag ? (
    <p className={styles.formContainer}>{endpointMessage}</p>
  ) : null;
}

export default EndpointMessage;

EndpointMessage.propTypes = {
  errorFlag: PropTypes.bool,
  endpointMessage: PropTypes.string,
};
