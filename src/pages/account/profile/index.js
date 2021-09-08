import React, { Component } from "react";
import { connect } from "react-redux";
import Avatar from "react-avatar-edit";
import { Formik, Form, Field } from "formik";

import { storage } from "services/firebase";
import InputField from "components/Input";

import {
  getUserInfoAction,
  getUserInfo,
  spinnerAction,
  updateUserInfo,
} from "actions";
import Button from "components/Button";

import imageConstants from "utils/imageConstants";

import { EditProfileSchema } from "utils/formValidation";

import AccountNavBar from "pages/account/accountNavBar";
import AccountHeader from "pages/account/accountHeader";

import styles from "./profile.module.scss";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: imageConstants.AVATAR_ICON,
      isEdit: false,
      isFromEdit: false,
      name: "",
      mobile: "",
    };
  }

  onClose = () => this.setState({ preview: null });

  onCrop = (preview) => this.setState({ preview });

  onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 500000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.props.spinnerAction(false);
    }
    if (prevProps.updatedUserPayload !== this.props.updatedUserPayload) {
      this.props.getUserInfoAction((value) => {
        this.handleSpinner(value);
        this.setState({ isFromEdit: value });
      });
    }
  }

  componentDidMount() {
    this.handleSpinner(true);
    this.props.getUserInfo().then((res) => {
      const mobilePayload = res && res.result && res.result.mobile;
      storage
        .ref("image")
        .child(mobilePayload + ".jpeg")
        .getDownloadURL()
        .then((url) => {
          this.setState({ preview: url }, () => this.handleSpinner(false));
        });
    });
  }

  handleApiCall = () => {
    const value = { name: this.state.name, mobile: this.state.mobile };
    this.handleSpinner(true);
    this.props.updateUserInfo(value);
  };

  renderEditForm = () => {
    const form = {
      name: this.state.name,
      mobile: this.state.mobile,
    };
    return (
      <Formik
        initialValues={form}
        validationSchema={EditProfileSchema}
        onSubmit={(values) => {
          this.handleApiCall(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} noValidate autoComplete="off">
            <>
              <Field
                id="outlined-name-input"
                type="text"
                placeholder="Enter Name"
                name="name"
                containerClassname={styles.containerStyle}
                labelStyle={{
                  top: "0.9rem",
                }}
                inputClassName={styles.inputStyle}
                component={InputField}
                isRequired
                onTextChange={(e) => this.setState({ name: e })}
              />

              <Field
                id="outlined-mobile-input"
                type="text"
                placeholder="Enter Mobile Number"
                name="mobile"
                containerClassname={styles.containerStyle}
                labelStyle={{
                  top: "0.9rem",
                }}
                inputClassName={styles.inputStyle}
                component={InputField}
                isRequired
                onTextChange={(e) => this.setState({ mobile: e })}
              />
            </>
          </Form>
        )}
      </Formik>
    );
  };

  renderProfileDetail = () => {
    const { userInfo } = this.props;
    const { isFromEdit } = this.state;
    return (
      <div className={styles.profileDetailSubContainer}>
        <div className={styles.profileDetailStyle}>
          <div>
            <h4>Name: </h4>
            <h4>Mobile: </h4>
            <h4>Email:</h4>
          </div>
          <div>
            {isFromEdit ? (
              this.renderEditForm()
            ) : (
              <>
                <h4>
                  {userInfo && userInfo.result ? userInfo.result.name : ""}
                </h4>
                <h4>
                  {userInfo && userInfo.result ? userInfo.result.mobile : ""}
                </h4>
              </>
            )}
            <h4 className={isFromEdit ? styles.emailStyleWhenEdit : null}>
              {userInfo && userInfo.result ? userInfo.result.email : ""}
            </h4>
          </div>
        </div>
        {isFromEdit ? (
          <Button
            className={styles.editButtonStyle}
            variant="secondary"
            onClick={() => this.handleApiCall()}
          >
            Update Details
          </Button>
        ) : (
          <Button
            className={styles.editButtonStyle}
            variant="secondary"
            onClick={() =>
              this.setState({
                isFromEdit: true,
                name: userInfo.result.name,
                mobile: userInfo.result.mobile,
              })
            }
          >
            Edit Details
          </Button>
        )}
      </div>
    );
  };

  render() {
    const { isEdit, mobile } = this.state;
    const {
      userInfo,
      location: { pathname },
    } = this.props;
    const mobilePayload =
      (userInfo && userInfo.result && userInfo.result.mobile) || mobile;

    const routeName = pathname.replace("/", "");
    return (
      <>
        {userInfo && userInfo.result ? (
          <>
            <AccountHeader routeName={routeName} />
            <div className={styles.mainContainer}>
              <AccountNavBar />

              <div className={styles.profileContainer}>
                <h3>Profile Detials</h3>
                <div className={styles.profileSubContainer}>
                  <div className={styles.avatarContainer}>
                    {isEdit ? (
                      <Avatar
                        width={200}
                        height={150}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        onBeforeFileLoad={this.onBeforeFileLoad}
                      />
                    ) : (
                      <img
                        className={styles.avatarStyle}
                        src={this.state.preview}
                        alt="Preview"
                      />
                    )}

                    {isEdit ? (
                      <Button
                        className={styles.avatarButtonStyle}
                        variant="secondary"
                        onClick={() => {
                          const profileImage = this.state.preview;
                          const thumbUploadTask = storage
                            .ref(`image/${mobilePayload + ".jpeg"}`)
                            .putString(profileImage, "data_url");
                          thumbUploadTask.on(
                            "state_changed",
                            (snapshot) => {},
                            (error) => {},
                            () => {
                              storage
                                .ref("image")
                                .child(mobilePayload + ".jpeg")
                                .getDownloadURL()
                                .then((url) => {
                                  this.setState({
                                    preview: url,
                                  });
                                });
                            }
                          );
                          this.setState({
                            isEdit: false,
                          });
                        }}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        className={styles.avatarButtonStyle}
                        variant="secondary"
                        onClick={() => this.setState({ isEdit: true })}
                      >
                        Click to Change
                      </Button>
                    )}
                  </div>
                  {this.renderProfileDetail()}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ height: "100%" }} />
        )}
      </>
    );
  }
}

const mapDispatchToProps = {
  getUserInfoAction,
  spinnerAction,
  updateUserInfo,
  getUserInfo,
};

const mapStateToProps = ({ userReducer: userState }) => {
  return {
    apiError: userState.apiError,
    userInfo: userState.userInfoPayload,
    updatedUserPayload: userState.updatedUserPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
