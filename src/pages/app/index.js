import React, { Component } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./toastifyStyle.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "pages/app/header";
import Footer from "pages/app/footer";

import {
  getProductCategoryAction,
  getProductItemAction,
  bannerAction,
  testimonialAction,
} from "actions";

import Routes from "./routes";

import ScrollToTop from "components/ScrollToTop";
import Spinner from "components/Spinner";
import ReactGifLoader from "components/ReactGifLoader";

import styles from "./app.module.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  componentDidMount() {
    //  Below two line need to be removed when app goes live
    //  localStorage.setItem(config.VENDOR_ID, "5f0dbec3b0d1a2616e895f96");
    // document.body.style.overflowY = "unset";

    const {
      getProductCategoryAction,
      getProductItemAction,
      bannerAction,
      testimonialAction,
      vendorId,
    } = this.props;

    this.updateWindowDimensions();

   
      getProductCategoryAction(vendorId, () => {});
      getProductItemAction(vendorId, () => {});
  

    bannerAction();
    testimonialAction();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateWindowDimensions);
  // }

  updateWindowDimensions = () => this.setState({ height: window.innerHeight });

  renderSpinner = () => {
    const { spinnerState } = this.props;
    const { height } = this.state;
    return (
      spinnerState && (
        <div
          className={styles.spinnerStyleContainer}
          style={{
            height: height,
          }}
        >
          <Spinner className={styles.spinnerStyle} />
        </div>
      )
    );
  };

  render() {
    const { fetching } = this.props;
    return (
      <>
        {fetching ? (
          <ReactGifLoader />
        ) : (
          <BrowserRouter>
            <ScrollToTop>
              <Header />
              <Switch>
                <Routes />
              </Switch>
              <Footer />
            </ScrollToTop>
            {this.renderSpinner()}
            <ToastContainer
              limit={1}
              newestOnTop={true}
              preventDuplicates={true}
            />
          </BrowserRouter>
        )}
      </>
    );
  }
}

const mapDispatchToProps = {
  getProductItemAction,
  getProductCategoryAction,
  bannerAction,
  testimonialAction,
};

const mapStateToProps = ({
  spinnerReducer,
  categoryReducer,
  itemReducer,
  bannerReducer,
  testimonialReducer,
  vendorReducer,
}) => {
  return {
    fetching:
      categoryReducer.fetching ||
      itemReducer.fetching ||
      bannerReducer.fetching ||
      testimonialReducer.fetching,
    spinnerState: spinnerReducer.spinnerState,
    vendorId: vendorReducer?.vendorId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
