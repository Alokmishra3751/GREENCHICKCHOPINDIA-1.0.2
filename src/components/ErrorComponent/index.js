import React from "react";
import styles from "./ErrorComponent.module.scss";

export default function ErrorComponent({ children }) {
  return <div className={styles.errorContainer}>{children}</div>;
}
