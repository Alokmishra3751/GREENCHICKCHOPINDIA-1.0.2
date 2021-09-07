import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import styles from "./home.module.scss";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  componentDidMount() {
    document.body.style.overflowY = "hidden";
  }

  handleChange = (address) => {
    this.setState({ address: address });
  };

  handleSelect = (address) => {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then((results) => {
        console.log(results);
        this.props.spinnerAction(true);
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        this.props.getVendorAction(latLng, this.props.spinnerAction);
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    const searchOptions = {
      componentRestrictions: { country: ["in"] },
    };

    return (
      <PlacesAutocomplete
        searchOptions={searchOptions}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {(
          { getInputProps, suggestions, getSuggestionItemProps, loading },
          index
        ) => (
          <div key={index}>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: styles.inputField,
              })}
            />
            <div className={styles.dropDownContainerStyle}>
              {loading && (
                <div className={styles.dropDownStyle}>Loading...</div>
              )}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? styles.dropDownStyle
                  : styles.dropDownStyle;
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "#eeeeee",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                    };
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
