import React, { Component } from "react";
import { connect } from "react-redux";

import TestimonialCard from "components/TestimonialCard";

import styles from "./home.module.scss";

class TestimonialList extends Component {
  render() {
    const { testimonialPayload } = this.props;

    return (
      <div className={styles.mainWrapContainer}>
        <div className={styles.testimonailCardTitleWrapContainer}>
          <h3>What Our Customers Say</h3>
        </div>
        <div className={styles.testimonailCardWrapContainer}>
          {testimonialPayload &&
            testimonialPayload.map((testimonial, index) => {
              return (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  description={testimonial.description}
                  imgSrc={testimonial.image_url}
                  avatar={testimonial.icon}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ testimonialReducer }) => {
  return {
    testimonialPayload: testimonialReducer?.testimonialPayload?.result?.result,
  };
};

export default connect(mapStateToProps)(TestimonialList);
