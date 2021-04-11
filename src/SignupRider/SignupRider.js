import {
  Box,
  Button,
  Chip,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import Autocomplete from "@material-ui/lab/Autocomplete";
import townshipData from "./townships.js";
import { useState } from "react";
import axios from "../api/index";
import Spinner from "../utils/Spinner/Spinner";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";
import { riderSignUpValidation } from "../utils/formValidation/index";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: "0.5rem",
  },
  input: {
    marginTop: "1rem",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const SignupRider = () => {
  const classes = useStyle();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  // For shops
  const [shops, setShops] = useState([]);
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");

  // For townships
  const [townships, setTownships] = useState([]);
  const [tsp, setTsp] = useState("");

  // For image
  const [imageURL, setImageURL] = useState("");

  const addNewShopHandler = (e) => {
    e.preventDefault();
    setShops((prevShops) => [
      ...prevShops,
      {
        name: shopName,
        detail: shopDescription,
      },
    ]);
    setShopName("");
    setShopDescription("");
  };

  const addNewTownshipHandler = (e) => {
    e.preventDefault();
    setTownships((prevTsps) => [...prevTsps, tsp]);
    setTsp("");
  };

  const handleDelete = (shopToDelete) => () => {
    setShops((shop) => shop.filter((shop) => shop.name !== shopToDelete.name));
  };

  const handleDeleteTsp = (shopToDelete) => () => {
    setTownships((shop) => shop.filter((shop) => shop !== shopToDelete));
  };

  const imageUploadHandler = (e) => {
    e.preventDefault();
    setPicLoading(true);
    const image = e.target.files[0];
    const data = new FormData();
    data.append("file", image);
    axios.post("/api/rider/upload", data).then((response) => {
      setPicLoading(false);
      setImageURL(response.data.data);
    });
  };

  return (
    <Box component="div" className={classes.container}>
      <Typography variant="h5">
        <strong>Create a new rider profile!</strong>
      </Typography>
      <Formik
        validationSchema={riderSignUpValidation}
        // enableReinitialize={true}
        initialValues={{
          name: "",
          detail: "",
          township: [],
          phoneNumber: "",
          availableShops: [],
        }}
        onSubmit={async (
          { name, township, phoneNumber, availableShops, detail },
          { resetForm }
        ) => {
          setLoading(true);
          township = townships;
          availableShops = shops;
          const payload = {
            name,
            picURL: imageURL,
            township,
            availableShops,
            phoneNumber,
            detail,
          };
          await axios.post("/api/rider", payload).then((response) => {
            setLoading(false);
            setSuccess(true);
            resetForm();
            history.push(`/rider/signup/${response.data.id}`);
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              value={values.name}
              name="name"
              label="Name"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
              fullWidth
              error={touched.name && errors.name}
              helperText={errors.name}
              onBlur={handleBlur}
            />
            <TextField
              value={values.detail}
              name="detail"
              label="About you"
              variant="outlined"
              className={classes.input}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              error={touched.detail && errors.detail}
              helperText={errors.detail}
              onBlur={handleBlur}
            />
            <TextField
              variant="outlined"
              name="phoneNumber"
              value={values.phoneNumber}
              label="Phone Number"
              className={classes.input}
              onChange={handleChange}
              fullWidth
              error={touched.phoneNumber && errors.phoneNumber}
              helperText={errors.phoneNumber}
              onBlur={handleBlur}
            />
            {picLoading ? <Spinner /> : null}
            {imageURL ? (
              <img
                src={imageURL}
                alt="your pic"
                style={{ marginTop: "1rem", height: 150 }}
              />
            ) : null}
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={imageUploadHandler}
            />
            <label htmlFor="contained-button-file">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="span"
                className={classes.input}
              >
                ဓါတ်ပုံတင်မည်
              </Button>
            </label>
            <Typography className={classes.input} variant="h6">
              Add delivery places for you
            </Typography>
            {townships.map((item, i) => (
              <Chip
                color="secondary"
                key={i}
                variant="outlined"
                label={item}
                onDelete={handleDeleteTsp(item)}
                className={classes.chip}
              />
            ))}
            <Autocomplete
              value={tsp}
              label="Townships"
              options={townshipData}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Townships" variant="outlined" />
              )}
              onChange={(e, newValue) => {
                e.preventDefault();
                setTsp(newValue);
              }}
              className={classes.input}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.input}
              disabled={tsp.length === 0}
              onClick={(e) => addNewTownshipHandler(e)}
            >
              Add Township
            </Button>
            <Typography variant="h6" className={classes.input}>
              Tell us about the shops you are ok to deliver
            </Typography>
            {shops.map((shop, i) => (
              <Chip
                color="secondary"
                key={i}
                variant="outlined"
                label={shop.name}
                onDelete={handleDelete(shop)}
                className={classes.chip}
              />
            ))}
            <TextField
              variant="outlined"
              value={shopName}
              label="Shop Name"
              className={classes.input}
              onChange={(e) => setShopName(e.target.value)}
              fullWidth
            />
            <TextField
              variant="outlined"
              // name="phoneNumber"
              value={shopDescription}
              label="Shop Description"
              helperText="Can be empty!"
              multiline
              rows={3}
              className={classes.input}
              onChange={(e) => setShopDescription(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.input}
              disabled={shopName.length === 0}
              onClick={(e) => addNewShopHandler(e)}
            >
              Add shop
            </Button>
            {loading ? <Spinner /> : null}
            {success ? (
              <Alert severity="success" className={classes.input}>
                <strong style={{ color: "green" }}>
                  Successfully Signed up!
                </strong>
              </Alert>
            ) : null}
            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit}
              disabled={townships.length === 0}
              color="secondary"
              variant="contained"
              className={classes.input}
            >
              Done!
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignupRider;

// TODOS:
// [x]: formik form with kind of data fields in data.js
// [x]: add new restaurants with idk what to call that( click to add new field)
// []: photo or without photo? think with photo is better for person validation
