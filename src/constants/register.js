import * as Yup from "yup";
import { phoneNumberRegex, passwordRegex, nameRegex } from "./regex";

export const signUpInitialValues = {
  email: "",
  name: "",
  phoneNumber: "",
  password: "",
  confirm_password: "",
};

export const signUpValidationSchema = () =>
  Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup
      .string()
      .required("Required")
      .matches(nameRegex, "Use alphabets only"),
    phoneNumber: Yup.string()
      .required("Required")
      .min(11, "Minimum length is 11 character")
      .max(11, "Maximum length is 11 character")
      .matches(phoneNumberRegex, "Use numbers only"),
    password: Yup.string()
      .required("Required")
      .min(7, "too short")
      .max(9, "too long")
      .matches(passwordRegex, "Use alphabets and numbers only"),
    confirm_password: Yup.string()
      .required("Both passwords must match")
      .min(7, "too short")
      .max(9, "too long")
      .oneOf([Yup.ref("password"), null], "Both passwords must match"),
  });

export const signInInitialValues = {
  email: "",
  password: "",
};

export const signInValidationSchema = () =>
  Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(7, "too short")
      .max(9, "too long")
      .matches(passwordRegex, "Use alphabets and numbers only"),
  });
