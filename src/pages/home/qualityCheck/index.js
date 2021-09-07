import React, { Component } from "react";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

import styles from "./qualityCheck.module.scss";
import { qualityLeftPayload, qualityRightPayload } from "./qualityPayoad";

export default class QualityCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleWindow: false,
      width: 0,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({ width: window.innerWidth });

  renderSteps = () => (
    <div className={styles.stepContainer}>
      <div className={styles.step}>
        <div>
          <div className={styles.cricleStep}>1</div>
        </div>
      </div>
      <div className={styles.step}>
        <div>
          <div className={styles.cricleStep}>2</div>
        </div>
      </div>
      <div className={styles.step}>
        <div>
          <div className={styles.cricleStep}>3</div>
        </div>
      </div>
      <div className={styles.step}>
        <div>
          <div className={styles.cricleStep}>4</div>
        </div>
      </div>
      <div className={styles.step}>
        <div>
          <div className={styles.cricleStep}>5</div>
        </div>
      </div>
    </div>
  );

  render() {
    const { toggleWindow, width } = this.state;

    return !toggleWindow ? (
      <div className={styles.mainContainer}>
        <h3 className={styles.headerStyle}>Quality Check</h3>
        <div>
          <ul className={styles.listContainer}>
            <li className={styles.listStyle}>Premium Produce Produce</li>
            <li className={styles.listStyle}>
              World-Class Central Production Unit
            </li>
            <li className={styles.listStyle}>150 Quality Checks</li>
            <li className={styles.listStyle}>Delivered Fresh Everyday</li>
            <li className={styles.listLastStyle}>Extraordinary Cooking</li>
          </ul>
        </div>

        <button
          className={styles.buttonStyle}
          onClick={() => this.setState({ toggleWindow: true })}
        >
          Discover How
          <FiChevronDown className={styles.iconStyle} />
        </button>
      </div>
    ) : (
      <div className={styles.expandedMainContainer}>
        <h3 className={styles.expandedHeaderStyle}>Quality Check</h3>
        <GrClose
          className={styles.closeIconStyle}
          onClick={() => this.setState({ toggleWindow: false })}
        />
        <div className={styles.expandedSubContainer}>
          <div className={styles.expandedLeftContainer}>
            {qualityLeftPayload.map((item) => (
              <div key={item.id} className={styles.contentContainer}>
                <img
                  src={item.imgSrc}
                  alt="alt"
                  className={styles.contentImageStyle}
                />
                <h4 className={styles.qualityHeaderStyle}>{item.title}</h4>
                <h5 className={styles.qualityParagraphStyle}>
                  {item.description}
                </h5>
              </div>
            ))}
          </div>
          {width > 767 && this.renderSteps()}
          <div className={styles.expandedrightContainer}>
            {qualityRightPayload.map((item) => (
              <div key={item.id} className={styles.contentContainer}>
                <img
                  src={item.imgSrc}
                  alt="alt"
                  className={styles.contentImageStyle}
                />
                <h4 className={styles.qualityHeaderStyle}>{item.title}</h4>
                <h5 className={styles.qualityParagraphStyle}>
                  {item.description}
                </h5>
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.expandedButtonStyle}
          onClick={() => this.setState({ toggleWindow: false })}
        >
          Close
          <FiChevronUp className={styles.expandedIconStyle} />
        </button>
      </div>
    );
  }
}
