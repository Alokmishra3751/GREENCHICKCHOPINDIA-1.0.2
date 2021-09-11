import React, { Component } from "react";
import GifLoader from "react-gif-loader";

import imageConstant from "utils/imageConstants";

class ReactGifLoader extends Component {
  render() {
    return (
      <>
        <GifLoader
          loading={true}
          imageSrc={imageConstant.SPINNER}
          imageStyle={{
            height: "100px",
            width:"100px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          overlayBackground="rgba(0,0,0,0)"
        />
      </>
    );
  }
}

export default ReactGifLoader;
