import React from "react";
import { Link as RLink } from "react-router-dom";
import isExternal from "is-url-external";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./link.module.scss";

const useHref = (link) => {
  return isExternal(link) || /mailto:.*/.test(link);
};

// eslint-disable-next-line valid-jsdoc
/**
 * Wrapper Component for react-router-dom
 * Link that works for external URLs and mailto URLs.
 *
 */

function Link({ linkStyle, className, ...props }) {
  return useHref(props.to) ? (
    <a
      style={props.linkStyle}
      href={props.to}
      {...props}
      className={classNames(className, styles.link)}
      target={!props.notab && "_blank"}
    >
      {props.children}
    </a>
  ) : (
    <RLink
      style={linkStyle}
      className={classNames(className, styles.link)}
      {...props}
    />
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  /** If true, external link will not open in new tab. */
  notab: PropTypes.bool,
  linkStyle: PropTypes.object,
  className: PropTypes.string,
};
export default Link;
