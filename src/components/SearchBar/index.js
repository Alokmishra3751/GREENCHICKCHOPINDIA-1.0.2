import React, { Component } from "react";

import Select, { components } from "react-select";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import styles from "./searchBar.module.scss";

class SearchBar extends Component {
  render() {
    const { history, searchPayload, productPayload } = this.props;

    const ValueContainer = ({ children, ...props }) => {
      return (
        components.ValueContainer && (
          <components.ValueContainer {...props}>
            {!!children && (
              <img
                src="https://img.icons8.com/ios-filled/25/000000/search.png"
                alt="tesst"
                className={styles.searchBarIconStyle}
              />
            )}
            {children}
          </components.ValueContainer>
        )
      );
    };

    return (
      <Select
        value=""
        onChange={(searchItem) => {
          const selectedProduct = productPayload.filter(
            (product) => product._id === searchItem.value
          );
          history.push(searchItem.route, {
            payload: searchItem,
            selectedProduct: selectedProduct[0],
          });
        }}
        isSearchable
        placeholder="Search Item..."
        options={searchPayload}
        styles={selectStyles}
        components={{ ValueContainer }}
      />
    );
  }
}

const mapStateToProps = ({ itemReducer }) => {
  const productPayload = itemReducer?.productPayload?.result?.result;

  const searchPayload =
    productPayload &&
    productPayload.map((product) =>
      Object.assign(
        {},
        {
          route: `/product/${product._id}`,
          label: product.name,
          value: product._id,
        }
      )
    );

  return {
    searchPayload: searchPayload,
    productPayload: productPayload,
  };
};

export default withRouter(connect(mapStateToProps)(SearchBar));

const selectStyles = {
  container: (base) => ({
    ...base,
  }),
  indicatorsContainer: (base) => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    "@media (min-width: 0) and (max-width: 340px)": {
      width: "220px",
      marginLeft: "10px",
    },
    "@media (min-width: 340px) and (max-width: 767px)": {
      width: "280px",
      marginLeft: "10px",
    },
    "@media (min-width: 768px) and (max-width: 991px)": {
      width: "350px",
      marginLeft: "25px",
    },
    "@media (min-width: 992px) and (max-width: 1200px)": {
      width: "380px",
    },
    width: "450px",
  }),
  control: (base, state) => {
    return {
      ...base,
      "@media (min-width: 0) and (max-width: 340px)": {
        width: "160px",
        margin: "0px 10px",
      },
      "@media (min-width: 340px) and (max-width: 767px)": {
        width: "200px",
        margin: "0px 10px",
      },
      "@media (min-width: 768px) and (max-width: 991px)": {
        width: "300px",
        margin: "0px 25px",
      },
      "@media (min-width: 992px) and (max-width: 1300px)": {
        width: "380px",
      },
      width: "450px",
      boxShadow: "none",
      height: "45px",
      border: "0px",
      borderRadius: "0px",
      fontSize: 16,
      textAlign: "left",
      cursor: "pointer",
      paddingLeft: "10px",
    };
  },
};
