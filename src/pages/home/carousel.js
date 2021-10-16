// eslint-disable-next-line 
import React, { Component } from "react";
// eslint-disable-next-line 
import agent from "./../../services/agent";
import Slider from "react-slick";


import ImageConstant from "utils/imageConstants";

import styles from "./home.module.scss";

class BannerSlider extends React.Component {
  render(){
    let settings = { 
      slidesToShow:1,
      slidesToScroll:1,
      dots:true,
      fade:true,
      autoplay:true,
      speed:900,
      className: 'TheSlickSlide'
    }
    return (
      <Slider {...settings} >
        <div>
          <div className={styles.slideContent}>
            <img src={ImageConstant.LANDING_ONE_ICON} alt ="banner"/>
            
              <div className={styles.Content}>
                <h2>Get Your Wings Fresh and Delicious</h2>
                <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
              </div>  
            
          </div>
        </div>
        <div>
          <div className={styles.slideContent}>
            <img src={ImageConstant.LANDING_TWO_ICON} alt ="banner"/>
            <div className="container">
              <div className={styles.Content}>
                <h2>The Chickan Superimo and Wings Chun</h2>
                <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.slideContent}>
            <img src={ImageConstant.LANDING_THREE_ICON} alt ="banner"/>
           
            <div className={styles.Content}>
              <h2>Green Chick Chop - Healthy and Fresh</h2>
              <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
            </div>
           
          </div>
        </div>
        <div>
          <div className={styles.slideContent}>
            <img src={ImageConstant.LANDING_FOUR_ICON} alt ="banner"/>
            
            <div className={styles.Content}>
              <h2>Green Chick Chop</h2>
              <p>Talk about food just as much as you eat it, you're in good company. We've got famous chefs and stars—Julia Child, Sophia Loren, Virginia Woolf—to thank for some of the greatest food quotes of all time. Do what you will with these: Memorize them, pin them, or print them out and tack them up all over your kitchen.</p>
            </div>
            
          </div>
        </div>
      </Slider>
      )
  }
}

export default BannerSlider;
