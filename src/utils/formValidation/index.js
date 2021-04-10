import * as Yup from "yup";

export const riderSignUpValidation = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  phoneNumber: Yup.string().required("Phone number is required!"),
});
