import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Link from "components/Link";

import { getProductBasedOnCategory } from "utils/helperFucntion";

import footerConstants from "./footerConstants";
import imageConstants from "utils/imageConstants";
import styles from "./footer.module.scss";

class Footer extends Component {
  renderAddressComponent = () => (
    <div className={styles.footerAddressContainer}>
      <h4>Contact Info</h4>
      <ul>
        <li className={styles.footerListItemStyle}>
          Green Incredible Foods Pvt Ltd
        </li>
        <li className={styles.footerListItemStyle}>
          B-ll/80, Mohan Co-operative Industrial Estate
        </li>
        <li className={styles.footerListItemStyle}>
          Near Mathura Road, Badarpur
        </li>
        <li className={styles.footerListItemStyle}>New Delhi - 110044</li>
        <li className={styles.footerListItemStyle}>
          Customer Care- 011-41012211
        </li>
      </ul>
    </div>
  );

  renderCategoryComponent = () => {
    const { history, categoryState, productPayload } = this.props;
    return (
      <div className={styles.footerCategoryContainer}>
        <h4> Category Items</h4>
        {categoryState &&
          categoryState !== undefined &&
          categoryState.map((item) => (
            <button
              className={styles.navButtonStyle}
              key={item.name}
              onClick={() => {
                const productList = getProductBasedOnCategory(
                  productPayload,
                  item
                );
                history.push(`/category/${item.name}`, {
                  title: `Category: ${item.name}`,
                  productList: productList,
                });
              }}
            >
              <Link
                className={styles.footerListItemStyle}
                to="/category/Mutton"
              >
                {item.name}
              </Link>
            </button>
          ))}
      </div>
    );
  };

  renderSocialComponent = () => (
    <div className={styles.footerSocialContainer}>
      <div>
        <h4>Follow Us On</h4>
        <div className={styles.footerSocialIconContainer}>
          <Link to={footerConstants.FACEBOOK_LINK}>
            <img
              src={imageConstants.FACEBOOK_ICON}
              alt="fb logo"
              className={styles.socialIconStyle}
            />
          </Link>
          <Link to={footerConstants.INSTAGRAM_LINK}>
            <img
              src={imageConstants.INSTAGRAM_ICON}
              alt="insta logo"
              className={styles.socialIconStyle}
            />
          </Link>

          <Link to={footerConstants.TWITTER_LINK}>
            <img
              src={imageConstants.TWITTER_ICON}
              alt="twitter logo"
              className={styles.socialIconStyle}
            />
          </Link>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <footer className={styles.footerContainer}>
        <img
          src={imageConstants.PRIMARY_ICON}
          alt="primary logo"
          className={styles.primaryIconStyle}
        />
        <div className={styles.footerContentContainer}>
          {this.renderAddressComponent()}
          {this.renderCategoryComponent()}
          {this.renderSocialComponent()}
        </div>
      </footer>
    );
  }
}

const mapStateToProps = ({ categoryReducer, itemReducer }) => {
  return {
    productPayload: itemReducer?.productPayload?.result?.result,
    categoryState: categoryReducer?.categoryList?.result?.result,
  };
};

export default withRouter(connect(mapStateToProps)(Footer));
