import * as Yup from "yup";

export const riderSignUpValidation = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  township: Yup.string().required("Township is required!"),
  phoneNumber: Yup.string().required("Phone number is required!"),
});
