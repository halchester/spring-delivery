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
import townships from "./townships.js";
import { useState } from "react";
import axios from "../api/index";
import Spinner from "../utils/Spinner/Spinner";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";

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
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleDelete = (shopToDelete) => () => {
    setShops((shop) => shop.filter((shop) => shop.name !== shopToDelete.name));
  };

  return (
    <Box component="div" className={classes.container}>
      <Typography variant="h5">Create a new rider profile!</Typography>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: "",
          township: "",
          phoneNumber: "",
          availableShops: [],
        }}
        onSubmit={async (
          { name, township, phoneNumber, availableShops },
          { resetForm }
        ) => {
          setLoading(true);
          availableShops = shops;
          const payload = { name, township, availableShops, phoneNumber };
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
          setFieldValue,
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
            />
            <Autocomplete
              name="township"
              options={townships}
              className={classes.input}
              onChange={(e, newValue, reason) => {
                setFieldValue("township", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Township"
                  variant="outlined"
                />
              )}
            />
            <TextField
              variant="outlined"
              name="phoneNumber"
              value={values.phoneNumber}
              label="Phone Number"
              className={classes.input}
              onChange={handleChange}
              fullWidth
            />
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
