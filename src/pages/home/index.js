import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "pages/productList";
import QualityCheck from "./qualityCheck";
import BannerSlider from "./carousel";
import CategoryList from "./categoryList";
import TestimonialList from "./testimonialList";
import Location from "./location";
import { toast } from "react-toastify";
import styles from "./home.module.scss";
import "./toastStyle.css";

import Constants from "utils/constants";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVendorNotSelected: false,
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

  handleVendorToggle = () => this.setState({ isVendorSelected:true });

  render() {
    const { bannerPayload, productPayload } = this.props;
    
    return (
      <div>
        
        <BannerSlider bannerPayload={bannerPayload} />
        <QualityCheck />
        
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
