import * as Yup from "yup";

export const riderSignUpValidation = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  detail: Yup.string().required("Tell us about yourself!"),
  phoneNumber: Yup.string().required("Phone number is required!"),
});

export const checkMimeType = (event) => {
  //getting file object
  let files = event.target.files;
  //define message container
  let err = "";
  // list allow mime type
  const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
  // loop access array
  for (var x = 0; x < files.length; x++) {
    // compare file type find doesn't matach
    // eslint-disable-next-line
    if (types.every((type) => files[x].type !== type)) {
      // create error message and assign to container
      err += files[x].type + " is not a supported format\n";
    }
  }

  if (err !== "") {
    // if message not same old that mean has error
    event.target.value = null; // discard selected file
    console.log(err);
    return false;
  }
  return true;
};
