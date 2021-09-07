import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./categoryCard.module.scss";

export default class CategoryCard extends Component {
  render() {
    const { imgSrc, title, subTitle, handleOnClick } = this.props;
    return (
      <div className={styles.categoryCardContainer} onClick={handleOnClick}>
        <img
          src={imgSrc}
          alt="categoryCard"
          className={styles.categoryCardImageStyle}
        />
        <div className={styles.categoryCardContentStyle}>
          <h2 className={styles.categoryCardTitleStyle}>{title}</h2>
          <h6 className={styles.categoryCardSubTitleStyle}>{subTitle}</h6>
        </div>
      </div>
    );
  }
}

CategoryCard.protoTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
};
