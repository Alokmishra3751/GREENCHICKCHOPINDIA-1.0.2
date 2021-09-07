import React from "react";
import Loader from "react-loader";
import PropTypes from "prop-types";

export default function Spinner({ className, scale, color }) {
  return (
    <div style={className ? { position: "unset" } : { position: "relative" }}>
      <Loader
        className={className}
        loaded={false}
        lines={13}
        length={12}
        width={4}
        radius={10}
        corners={1}
        rotate={0}
        direction={1}
        color={className ? "#fff" : "#000"}
        speed={1}
        trail={60}
        shadow={false}
        hwaccel={false}
        zIndex={2e9}
        scale={scale ? scale : 0.5}
      />
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
  scale: PropTypes.number,
  color: PropTypes.string,
};
