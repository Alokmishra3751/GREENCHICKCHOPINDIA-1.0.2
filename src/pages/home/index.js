import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "pages/productList";
import QualityCheck from "./qualityCheck";
import BannerSlider from "./carousel";
import CategoryList from "./categoryList";
import ImageConstant from "utils/imageConstants";
import TestimonialList from "./testimonialList";
// eslint-disable-next-line 
import { toast } from "react-toastify";
// eslint-disable-next-line 
import styles from "./home.module.scss";
import "./toastStyle.css";

import Constants from "utils/constants";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVendorSelected: true,
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

 

  render(){ 
    const { bannerPayload, productPayload } = this.props;
     
    return (
      <div>
        
        
        <BannerSlider bannerPayload={bannerPayload} />
        <QualityCheck />
        <section className={styles.bigCat}>
        <h3 className="text-center">Featured Items</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={styles.wrapper}>
               <a href="/category/veg">
                <img src={ImageConstant.VEG_MENU} alt="menu-card" />
                <h4>Veg</h4>
               </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.wrapper}>
              <a href="/category/chicken">
                <img src={ImageConstant.NON_VEG_MENU} alt="menu-card" />
                <h4>Non Veg</h4>
               </a> 
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.wrapper}>
               <a href="/product">
                <img src={ImageConstant.DUAL_FLAVOUR} alt="menu-card" />
                <h4>Dual Flavour <span> veg and Non Veg </span> </h4>
                </a>
              </div>
            </div>
          </div>
        </div>
        </section>


        
        {productPayload && productPayload.length !== 0 && (
          <ProductList
            categoryType="Bestseller"
            suggestedProduct={productPayload}
          />
        )}
        
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
