import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./testimonialCard.module.scss";

export default class TestimonialCard extends Component {
  render() {
    const { imgSrc, name, description, avatar } = this.props;
    return (
      <div className={styles.testimonialCardContainer}>
        <img
          src={imgSrc}
          alt="testimonialCard"
          className={styles.testimonialCardImageStyle}
        />
        <div className={styles.testimonialCardContentStyle}>
          <div className={styles.testimonialCardHeaderStyle}>
            <img
              src={avatar}
              alt="avatar"
              className={styles.testimonialCardAvatarStyle}
            />
            <h2 className={styles.testimonialCardNameStyle}>{name}</h2>
          </div>
          <h6 className={styles.testimonialCardDescriptionStyle}>
            {description}
          </h6>
        </div>
      </div>
    );
  }
}

TestimonialCard.protoTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  imgSrc: PropTypes.string,
};
