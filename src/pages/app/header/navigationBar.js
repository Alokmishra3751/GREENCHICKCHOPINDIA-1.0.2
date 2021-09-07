import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getProductBasedOnCategory } from "utils/helperFucntion";

import styles from "./header.module.scss";

class NavigationBar extends Component {
  render() {
    const { history, categoryState, productPayload } = this.props;
    return (
      <>
        {categoryState && categoryState !== undefined && (
          <div className={styles.bottomNavigationContainer}>
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
                    history.push(`/category/${item.name.replace(/ /g, "")}`, {
                      title: `Category: ${item.name}`,
                      productList: productList,
                    });
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={styles.navButtonImageStyle}
                  />
                  <h5 className={styles.navButtonTextStyle}>{item.name}</h5>
                </button>
              ))}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ categoryReducer, itemReducer }) => {
  return {
    productPayload: itemReducer?.productPayload?.result?.result,
    categoryState: categoryReducer?.categoryList?.result?.result,
  };
};

export default withRouter(connect(mapStateToProps)(NavigationBar));
