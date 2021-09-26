import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CategoryCard from "components/CategoryCard";

import { getProductBasedOnCategory } from "utils/helperFucntion";

import styles from "./home.module.scss";

class CategoryList extends Component {
  render() {
    const { history, categoryState, productPayload } = this.props;
    return (
      <>
        {categoryState && categoryState !== undefined && (
          <div className={styles.categoryListMainContainer}>
            <div className={styles.mainWrapContainer}>
              <div className={styles.categoryTitle}>
                <h3>Explore by Category</h3>
              </div>
              <div className={styles.categoryText}>
                <p>Everything we have. Everything you need.</p>
              </div>
              <div className={styles.categoryCardWrapContainer}>
                {categoryState &&
                  categoryState !== undefined &&
                  categoryState.map((category, index) => {
                    const productList = getProductBasedOnCategory(
                      productPayload,
                      category
                    );

                    return (
                      <CategoryCard
                        key={index}
                        title={category.name}
                        subTitle={`${
                          productList && productList !== undefined
                            ? productList.length
                            : 0
                        } Products`}
                        imgSrc={category.image}
                        handleOnClick={() => {
                          history.push(`/category/${category.name}`, {
                            title: `Category: ${category.name}`,
                            productList: productList,
                          });
                        }}
                      />
                    );
                  })}
              </div>
            </div>
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

export default withRouter(connect(mapStateToProps)(CategoryList));
