import axios from "axios";
import config from "utils/config";

//This will check, which urls to use
const develop = false;

const CLOUD = {
  LOCAL: {
    API_ROOT: "http://localhost:8080/chop/",
    documentDownload: "http://127.0.0.1:8000/",
  },
  SERVER: {
    API_ROOT: "https://vendor.greenchickchopindia.com:3000/chop/",
    documentDownload: "",
  },
};
let URL = {};
if (develop) {
  URL = Object.assign({}, CLOUD.LOCAL);
} else {
  URL = Object.assign({}, CLOUD.SERVER);
}

const authToken = localStorage.getItem(config.AUTH_TOKEN);
axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

const requests = {
  get: (url, tokenForAPI) => {
    return axios
      .get(URL.API_ROOT + url, tokenForAPI)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
  },

  post: (url, body, tokenForAPI) => {
    return axios
      .post(URL.API_ROOT + url, body, tokenForAPI)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
  },

  patch: (url, body, tokenForAPI) => {
    return axios
      .patch(URL.API_ROOT + url, body, tokenForAPI)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
  },
};

const Auth = {
  login: (email, password) => {
    return requests.post("user/login/", {
      email: email,
      password: password,
    });
  },

  otpLogin: (phoneNumber, otp) => {
    return requests.post("user/mobile-login/", {
      phoneNumber: phoneNumber,
      otp: otp,
    });
  },

  sendOtp: (phoneNumber) => {
    return requests.post("user/send-otp/", {
      phoneNumber: phoneNumber,
    });
  },

  signUp: (signupPayload) => {
    return requests.post("user/", signupPayload);
  },
};

const User = {
  getUserInfo: () => {
    return requests.get("user", authToken);
  },

  updateUserInfo: (userPayload) => {
    return requests.patch("user", userPayload, authToken);
  },

  changeUserPassword: (userPayload) => {
    return requests.patch("user/change-password", userPayload, authToken);
  },

  forgetUserPassword: (userPayload) => {
    return requests.post("user/forgot-password", userPayload);
  },

  resetUserPassword: (resetId, userPayload) => {
    return requests.patch(`user/reset-password/${resetId}`, userPayload);
  },

  getBanner: () => {
    return requests.get("website");
  },
  getMobileBanner: () => {
    return requests.get("website/mobile/");
  },

  getTestimonial: () => {
    return requests.get("testimonial");
  },
};

const Customer = {
  getCustomerAddress: () => {
    return requests.get("customer/get-address", authToken);
  },

  addCustomerAddress: (addressPayload) => {
    return requests.post("customer/add-address", addressPayload, authToken);
  },
};

const Product = {
  getCategoryList: () => {
    return requests.get("itemcategory");
  },

  getCategoryListByVendor: (vendorId) => {
    return requests.get(`item/item-category/${vendorId}`);
  },

  getItemList: (vendorId) => {
    return requests.get(`item/item-detail/${vendorId}`);
  },
};

const Order = {
  getCustomerOrder: () => {
    return requests.get("customerorder/order-detail");
  },

  addCustomerOrder: (orderPayload, vendorId) => {
    return requests.post(
      `customerorder/add/${vendorId}`,
      orderPayload,
      authToken
    );
  },

  getDeliveryDate: () => {
    return requests.get("deliverytimeslots", authToken);
  },
};

const Vendor = {
  getVendor: (location) => {
    return requests.post("user/selected-vendor", location);
  },

  getCoupon: (payload) => {
    return requests.post("coupon/check-coupon", payload, authToken);
  },
};

const Otp = {
  verifyOtp: (payload) => {
    return requests.post("user/verify-otp", payload);
  },
  resendOtp: (resendPayload) => {
    return requests.post("user/retry-otp", resendPayload);
  },
};

export default {
  Auth,
  URL,
  User,
  Customer,
  Product,
  Order,
  Vendor,
  Otp,
};
