import React, { useState, useEffect } from "react";
import classNames from "classnames";

import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

import ErrorComponent from "components/ErrorComponent";

import styles from "./input.module.scss";

export default function InputField(props) {
  const {
    field: { onChange, onBlur, ...field },
    containerStyle,
    isRequired,
    placeholder,
    onTextChange,
    inputClassName,
    labelStyle,
    containerClassname,
    ...rest
  } = props;
  const [floatState, setfloatState] = useState(false);

  useEffect(() => {
    const { value } = field;
    if (value && value.length !== 0) {
      setfloatState(true);
    }
  }, [field]);

  const toggleBlur = (e) => {
    onBlur(e);
    e.target.value === "" ? setfloatState(false) : setfloatState(true);
  };

  const toggleFocus = () => {
    setfloatState(true);
  };

  const handleChange = (e) => {
    onChange(e);
    onTextChange && onTextChange(e.target.value);
  };

  const inputComponent = () => (
    <div
      className={
        containerClassname
          ? classNames(styles.floatingLabelInput, containerClassname)
          : styles.floatingLabelInput
      }
      style={containerStyle}
    >
      <label
        htmlFor={props.id}
        style={labelStyle ? labelStyle : null}
        className={
          floatState ? `${styles.activeLabel}` : `${styles.inactiveLabel}`
        }
      >
        {isRequired && floatState ? `${placeholder}*` : placeholder}
      </label>

      <input
        {...rest}
        {...field}
        className={inputClassName}
        value={field.value ? field.value : ""}
        onBlur={(e) => toggleBlur(e)}
        onFocus={toggleFocus}
        onChange={(e) => handleChange(e)}
      />
      <ErrorMessage name={field.name} component={ErrorComponent} />
    </div>
  );

  return <>{inputComponent()}</>;
}

InputField.propTypes = {
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object,
  containerStyle: PropTypes.object,
  form: PropTypes.object,
  isRequired: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  placeholder: "enter text",
  className: "",
  onFocus: () => {},
  onBlur: () => {},
};
