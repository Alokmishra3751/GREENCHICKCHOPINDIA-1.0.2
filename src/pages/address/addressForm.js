import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";

import InputField from "components/Input";
import Button from "components/Button";
import ErrorComponent from "components/ErrorComponent";

import { AddressSchema } from "utils/formValidation";

import styles from "./address.module.scss";

import { state, cities } from "./cities.js";

export default class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedState: "", cities: [], selectedCity: "" };
  }

  renderButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        Done
      </Button>
    );
  };

  render() {
    const form = {
      address: "",
      city: "",
      state: "",
      pin_code: "",
      landmark: "",
    };
    const {
      addCustomerAddressAction,
      toggleEditAddress,
      handleSpinner,
      getCustomerAddressAction,
    } = this.props;
    return (
      <div>
        <Formik
          initialValues={form}
          validationSchema={AddressSchema}
          onSubmit={(values) => {
            handleSpinner(true);
            addCustomerAddressAction(
              values,
              toggleEditAddress,
              handleSpinner,
              getCustomerAddressAction
            );
          }}
        >
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h2>Add Address</h2>
                <Field
                  id="outlined-address-input"
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  inputClassName={styles.inputStyle}
                  component={InputField}
                  isRequired
                />

                <Field
                  id="outlined-state-input"
                  type="text"
                  name="state"
                  value={this.state.selectedState.value}
                  component={(props) => (
                    <div className={styles.topMargin}>
                      <Select
                        {...props}
                        styles={selectStyles}
                        value={this.state.selectedState}
                        onChange={(state) => {
                          this.setState(
                            {
                              selectedState: state,
                              cities: cities(state.value),
                              selectedCity: "",
                            },
                            () => {
                              setFieldValue(
                                "state",
                                this.state.selectedState.value
                              );
                              setFieldValue("city", "");
                            }
                          );
                        }}
                        isSearchable
                        placeholder="Search State..."
                        options={state}
                      />
                      {this.state.selectedState.length === 0 &&
                      touched["state"] &&
                      errors.state ? (
                        <ErrorComponent>{errors.state}</ErrorComponent>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                />

                <Field
                  id="outlined-city-input"
                  type="text"
                  name="city"
                  value={this.state.selectedCity.value}
                  component={(props) => {
                    return (
                      <div className={styles.topMargin}>
                        <Select
                          {...props}
                          styles={selectStyles}
                          value={this.state.selectedCity}
                          onChange={(city) => {
                            this.setState({ selectedCity: city }, () =>
                              setFieldValue(
                                "city",
                                this.state.selectedCity.value
                              )
                            );
                          }}
                          isSearchable
                          placeholder="Search City..."
                          options={this.state.cities}
                        />

                        {this.state.selectedCity.length === 0 &&
                          touched["city"] &&
                          errors.city && (
                            <ErrorComponent>{errors.city}</ErrorComponent>
                          )}
                      </div>
                    );
                  }}
                  onTextChange={(e) => this.setState({ mobile: e })}
                />

                <Field
                  id="outlined-pincode-input"
                  type="text"
                  placeholder="Enter Pin Code"
                  name="pin_code"
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  isRequired
                  inputClassName={styles.inputStyle}
                  component={InputField}
                />
                <Field
                  id="outlined-landmark-input"
                  type="text"
                  placeholder="Enter Landmark"
                  name="landmark"
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  inputClassName={styles.inputStyle}
                  component={InputField}
                />
                {this.renderButton()}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const selectStyles = {
  container: (base) => ({
    ...base,
  }),
  menu: (base) => ({
    ...base,
    "@media (min-width: 0) and (max-width: 340px) ": {
      width: "280px",
    },
    "@media (min-width: 340px) and (max-width: 767px)": {
      width: "300px",
    },
    width: "364px",
  }),
  control: (base, state) => {
    return {
      ...base,
      "@media (min-width: 0) and (max-width: 340px) ": {
        width: "280px",
        margin: "10px 14px 0px 0px",
      },
      "@media (min-width: 340px) and (max-width: 767px)": {
        width: "300px",
        margin: "10px 14px 0px 0px",
      },
      width: "364px",
      boxShadow: "none",
      height: "42px",
      borderRadius: "4px",
      fontSize: "14px",
      textAlign: "left",
      cursor: "pointer",
      paddingLeft: "1px",
      border: "1px solid #767171",
    };
  },
};
