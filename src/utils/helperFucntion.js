import { toast } from "react-toastify";

import config from "utils/config";
import imageConstants from "./imageConstants";

const toastOption = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  closeButton: false,
  progress: undefined,
};

const notifySuccessToast = (message, timeout) => {
  toast.dismiss();
  setTimeout(
    () => {
      toast.success(message, toastOption);
    },
    timeout ? 500 : 0
  );
};

const notifyErrorToast = (message, timeout) => {
  toast.dismiss();
  setTimeout(
    () => {
      toast.error(message, toastOption);
    },
    timeout ? 500 : 0
  );
};

const isVendorSelected = () => localStorage.getItem(config.VENDOR_ID);

const isUserAuthenticated = (history) => {
  const data = localStorage.getItem(config.AUTH_TOKEN);
  if (data) {
    return history.push("/");
  }
  return null;
};

const getProductBasedOnCategory = (productPayload, category) =>
  productPayload &&
  productPayload.filter((item) => item.item_category._id === category._id);

const getProductBasedOnCategoryName = (productPayload, categoryName) =>
  productPayload &&
  productPayload.filter(
    (item) =>
      item?.item_category?.name?.replace(/ /g, "").toLowerCase() ===
      categoryName.replace(/ /g, "").toLowerCase()
  );

const handlePayment = (
  { amount, name, email, mobile, address },
  handleOrder
) => {
  let options = {
    key: "rzp_test_9Ln9o9J1VpfhfI",
    amount: amount, //amount, // 2000 paise = INR 20, amount in paisa
    name: "Green Chick Chop",
    description: "Item Payment",
    image: imageConstants.PRIMARY_ICON,
    handler: (response) => {
      return handleOrder("Online Payment", response.razorpay_payment_id);
    },
    prefill: {
      name,
      email,
      contact: mobile,
    },
    notes: {
      address,
    },
    theme: {
      color: "#ea1a20",
    },
  };

  let rzp = window.Razorpay(options);
  rzp.open();
};

export {
  notifySuccessToast,
  notifyErrorToast,
  isUserAuthenticated,
  getProductBasedOnCategory,
  handlePayment,
  isVendorSelected,
  getProductBasedOnCategoryName,
};
