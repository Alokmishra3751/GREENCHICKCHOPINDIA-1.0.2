import React, { Component } from "react";
import { connect } from "react-redux";

import { updateCheckoutListAction } from "actions";
import ItemDetail from "components/ItemDetail";
import ProductList from "pages/productList";

import { notifySuccessToast, notifyErrorToast } from "utils/helperFucntion";

import styles from "./productOverview.module.scss";

class ProductOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1, selectedPackage: 0 };
  }

  getData = (val) => {
    this.setState({ quantity: val.quantity });
    return val;
  };

  handleSelectedPackage = (value) => this.setState({ selectedPackage: value });

  onClickSuccess = (productPayload, quantity) => {
    const { updateCheckoutListAction } = this.props;
    updateCheckoutListAction(
      {
        ...productPayload,
        quantity: quantity,
      },
      true
    );
    notifySuccessToast("Item added successfully to cart!", 500);
  };

  render() {
    const {
      match: {
        params: { id },
      },
      location: { state },
      productPayload,
    } = this.props;

    const { quantity } = this.state;

    return (
      <>
        {state?.selectedProduct && state?.selectedProduct ? (
          <>
            <ItemDetail
              selectedPackage={this.state.selectedPackage}
              handleSelectedPackage={this.handleSelectedPackage}
              mulitPackage={state.selectedProduct.multi_package}
              multiPrice={state.selectedProduct.multi_price}
              name={state.selectedProduct.name}
              type={state.selectedProduct.packaging_type}
              description={state.selectedProduct.description}
              cost={state.selectedProduct.price}
              imgSrc={state.selectedProduct.image_url[0]}
              handleOnClick={(productPayload) =>
                quantity === 0
                  ? notifyErrorToast("Please add at least one quantity!")
                  : this.onClickSuccess(productPayload, quantity)
              }
              sendQuantityData={this.getData}
              counterId={id}
            />
            {productPayload && productPayload.length > 0 && (
              <div className={styles.cardTitleWrapContainer}>
                <h3>You May Also Like To See</h3>
                <ProductList suggestedProduct={productPayload} />
              </div>
            )}
          </>
        ) : (
          <div style={{ height: "300px" }} />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ itemReducer }, { location: { state } }) => {
  console.log(state?.selectedProduct);
  const seletectCategory = state?.selectedProduct?.item_category?.name
    .toLowerCase()
    .replace(/\s/g, "");

  const getProductList = itemReducer?.productPayload?.result?.result.filter(
    (item) => {
      console.log(item.item_category);
      if (item.item_category == null) {
        console.log(item);
      }
      return (
        item.item_category.name.toLowerCase().replace(/\s/g, "") ===
        seletectCategory
      );
    }
  );

  const removeSelectedProductFromList =
    getProductList &&
    getProductList.filter((item) => item._id !== state?.selectedProduct?._id);

  return {
    productPayload: removeSelectedProductFromList,
  };
};

const mapDispatchToProps = {
  updateCheckoutListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);
