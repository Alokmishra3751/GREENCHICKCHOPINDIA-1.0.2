import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./radioButton.module.scss";

export default class RadioButton extends Component {
  static defaultProps = {
    id: null,
    inputId: null,
    name: null,
    style: null,
    className: null,
    disabled: false,
    required: false,
    onChange: null,
    value: null,
  };

  static propTypes = {
    id: PropTypes.string,
    inputId: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = (e, onBlur) => {
    onBlur(e);
    this.setState({ focused: false });
  };

  render() {
    const {
      id,
      label,
      onChange,
      field: { name, onBlur, onChange: formikChange, ...field },
      value,
    } = this.props;
    if (this.input) {
      this.input.checked = this.props.checked;
    }

    return (
      <div className={styles.mainContainer}>
        <label className={styles.container}>
          {label}
          <input
            {...field}
            key="radio"
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={value === true}
            ref={(el) => (this.input = el)}
            onFocus={this.onFocus}
            onBlur={(e) => this.onBlur(e, onBlur)}
            disabled={this.props.disabled}
            required={this.props.required}
            onChange={(e) => {
              formikChange(e);
              onChange();
            }}
          />
          <span className={styles.checkmark}></span>
        </label>
      </div>
    );
  }
}
