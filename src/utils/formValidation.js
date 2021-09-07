import * as Yup from "yup";

export const OTPLoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, "Phone number is too short!")
    .required("Phone number is required"),
  otp: Yup.string().required("Otp  is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Email address is too short!")
    .max(255, "Email address is too long!")
    .email("Please enter valid email address")
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

export const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Email address is too short!")
    .max(255, "Email address is too long!")
    .email("Please enter valid email address")
    .required("Email address is required"),
});

export const OtpSchema = Yup.object().shape({
  otp: Yup.string().required("Otp  is required"),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    ),
  password: Yup.string()
    .required("Confirm password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    ),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    )
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  mobile: Yup.string()
    .min(10, "Phone number is too short!")
    .required("Phone number is required"),
});

export const AddressSchema = Yup.object().shape({
  address: Yup.string()
    .min(2, "Address is too short!")
    .max(250, "Address is too long!")
    .required("Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pin_code: Yup.string().required("Pin Code is required"),
  landmark: Yup.string(),
});

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  email: Yup.string()
    .min(3, "Email address is too short!")
    .max(255, "Email address is too long!")
    .email("Please enter valid email address")
    .required("Email address is required"),
  mobile: Yup.string()
    .min(10, "Phone number is too short!")
    .required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain 8 to 20 letters, including at least one uppercase letter (i.e. A-Z), one lowercase letter (i.e a-z), one numeric character (i.e. 0-9) and one special character (eg.  !,?)"
    )
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
