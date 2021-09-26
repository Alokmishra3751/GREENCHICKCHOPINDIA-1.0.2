import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import {
  updateCheckoutListAction,
  getProductItem,
  spinnerAction,
} from "actions";

import Spinner from "components/Spinner";
import ItemCard from "components/ItemCard";

import {
  notifySuccessToast,
  getProductBasedOnCategoryName,
} from "utils/helperFucntion";

import styles from "./productList.module.scss";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productPayload: [],
      loader: false,
      height: 0,
    };
  }
  onClickSuccess = (productPayload) => {
    const { updateCheckoutListAction } = this.props;

    updateCheckoutListAction({
      ...productPayload,
      quantity: 1,
    });
    notifySuccessToast("Item added successfully to cart!", 500);
  };

  async componentDidMount() {
    const {
      location: { pathname, search, state },
      history,
      match: {
        params: { type },
      },
      getProductItem,
      vendorId,
      spinnerAction,
      suggestedProduct,
    } = this.props;
    this.updateWindowDimensions();

    let params = new URLSearchParams(search);
    let facebookId = params.get("fbclid");

    if (facebookId !== null) {
      spinnerAction(true);
      const productPayload = await getProductItem(vendorId, spinnerAction);
      const productList = getProductBasedOnCategoryName(productPayload, type);
      return history.push(pathname, {
        title: `Category: ${type}`,
        productList: productList,
      });
    }
    if (
      type !== undefined &&
      state?.productList === undefined &&
      suggestedProduct === undefined
    ) {
      this.setState(
        {
          loader: true,
        },
        async () => {
          const productPayload = await getProductItem(vendorId, () => {});
          const products = getProductBasedOnCategoryName(productPayload, type);
          this.setState({
            productPayload: products,
            loader: false,
          });
        }
      );
    }
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({ height: window.innerHeight });

  render() {
    const {
      categoryType,
      history,
      location: { state },
      suggestedProduct,
    } = this.props;
    const { productPayload, loader, height } = this.state;
    const productList =
      (state?.productList && state?.productList) ||
      (suggestedProduct && suggestedProduct) ||
      (productPayload && productPayload);
    return (
      <div className={styles.productMainContainer}>
        <div className={styles.mainProductWrapContainer}>
          <div className={styles.titleContainer}>
            <div
              className={classNames(
                styles.wrapTitleContainer,
                styles.productWrapTitleContainer
              )}
            >
              <h3 style={{ textTransform: "capitalize" }}>{categoryType}</h3>
            </div>
          </div>
          {loader ? (
            <div
              className={styles.spinnerStyleContainer}
              style={{
                height: height,
              }}
            >
              <Spinner className={styles.spinnerStyle} />
            </div>
          ) : productList && productList.length > 0 ? (
            <div className={styles.productWrapContainer}>
              {productList.map((item, index) => {
                const packagingType =
                  item.multi_package && item.multi_package.length !== 0
                    ? item.multi_package[0]
                    : item.packaging_type;
                const cost =
                  item.multi_price && item.multi_price.length !== 0
                    ? item.multi_price[0]
                    : item.price;
                const isMulti =
                  item.multi_package && item.multi_package.length !== 0
                    ? true
                    : false;
                return (
                  <div key={index} className={styles.itemContainer}>
                    <ItemCard
                      key={index}
                      itemKey={index}
                      isMulti={isMulti}
                      title={item.name}
                      subTitle={packagingType}
                      imgSrc={item.image_url[0]}
                      price={cost}
                      counterId={item._id}
                      handleOnButtonClick={this.onClickSuccess}
                      handleOnCardClick={() => {
                        const selectedProduct = productList.filter(
                          (product) => product._id === item._id
                        );

                        history.push(`/product/${item._id}`, {
                          selectedProduct: selectedProduct[0],
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyProductContainer}>
              <h1>Oops! All item sold out.</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ itemReducer, vendorReducer }) => {
  return {
    vendorId: vendorReducer?.vendorId,
  };
};

const mapDispatchToProps = {
  updateCheckoutListAction,
  getProductItem,
  spinnerAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);

ProductList.propTypes = {
  productList: PropTypes.array,
};
