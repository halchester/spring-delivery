import * as Yup from "yup";

export const riderSignUpValidation = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  detail: Yup.string().required("Tell us about yourself!"),
  phoneNumber: Yup.string().required("Phone number is required!"),
});
