import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "pages/productList";

import Carousel from "./carousel";
import CategoryList from "./categoryList";
import TestimonialList from "./testimonialList";
// eslint-disable-next-line
import { toast } from "react-toastify";
// eslint-disable-next-line
import styles from "./home.module.scss";
import "./toastStyle.css";
// eslint-disable-next-line
import Location from "pages/app/header/location";
import image1 from "assets/images/veg.jpg";
import image2 from "assets/images/non-veg.jpg";
import image3 from "assets/images/both-food.jpg";

import Constants from "utils/constants";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVendorNotSelected: false
    };
  }

  componentDidMount() {
    // toast.info("Use coupon code: HAPPYHOLIDAYS to avail 5% off", {
    //   position: "bottom-center",
    //   autoClose: 10000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   className: styles.toastClass,
    // });
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      isVendorNotSelected: nextProps.vendorId !== undefined ? false : true,
    };
  }

  handleVendorToggle = () => this.setState({ isVendorNotSelected: false });

  render() {
    const { bannerPayload, productPayload } = this.props;
     
    return (
      <div>
        
        <Carousel bannerPayload={bannerPayload} />
       
        <div className={styles.sectionPadding}>
          <div className="container">
            <div className={styles.sectionTitle}>
              <h3>Choose Your Best Item</h3>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className={styles.bestItem}>
                  <a href="veg.html">
                  <img src={image1} alt ="banner"/>
                  <h5>Veg Menu</h5>
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.bestItem}>
                  <a href="nonVeg.html">
                  <img src={image2} alt ="item"/>
                  <h5>Non-Veg Menu</h5>
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.bestItem}>
                  <a href="dualFood.html">
                  <img src={image3} alt ="food"/>
                  <h5>Taste For both</h5>
                  </a>
                </div>
              </div>
            </div>
          </div>
       
       <div className={styles.ProductList}/>
        {productPayload && productPayload.length !== 0 && (
          <ProductList
            categoryType="Available items"
            suggestedProduct={productPayload}
          />
        )}
        </div>

        <CategoryList />
        <TestimonialList />
      </div>
    );
  }
}
const mapStateToProps = ({ bannerReducer, itemReducer, vendorReducer }) => {
  const getBestSellingProductList = itemReducer?.productPayload?.result?.result?.filter(
    (item) =>
      item.item_tag &&
      item.item_tag.toLowerCase().replace(/\s/g, "") ===
        Constants.BEST_SELLING_FILTER_CONSTANT
  );

  return {
    bannerPayload: bannerReducer?.bannerPayload?.result?.result.map(
      (banner) => banner.promotional_banner
    ),
    productPayload: getBestSellingProductList,
    vendorId: vendorReducer?.vendorId,
  };
};

export default connect(mapStateToProps)(Home);
