import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./button.module.scss";

export default function Button({
  variant,
  onClick,
  type,
  children,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${classNames(styles.buttonStyle, className)} ${
        styles[variant]
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
  type: "submit",
};

Button.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};
