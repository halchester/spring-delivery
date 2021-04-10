import {
  Box,
  Button,
  Chip,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { getOneRider } from "../api/query";
import Spinner from "../utils/Spinner/Spinner";
import { Formik } from "formik";
import { Autocomplete } from "@material-ui/lab";
import townships from "../SignupRider/townships";
import { useEffect, useState } from "react";
import axios from "../api/index";
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

const RiderEdit = (props) => {
  const id = props.match.params.id;
  const classes = useStyle();
  const history = useHistory();
  const [shops, setShops] = useState([]);
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { status, data } = useQuery(id, getOneRider);

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

  useEffect(() => {
    if (status === "success") {
      setShops(data.availableShops);
    }
    // eslint-disable-next-line
  }, [status]);

  console.log(shops);

  const handleDelete = (shopToDelete) => () => {
    setShops((shop) => shop.filter((shop) => shop.name !== shopToDelete.name));
  };

  return status === "success" ? (
    <Box>
      <Typography variant="h5">
        Edit your profile <strong>{data.name}</strong>
      </Typography>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          setLoading(true);
          const payload = {
            name: values.name,
            phoneNumber: values.phoneNumber,
            township: values.township,
            availableShops: shops,
          };
          axios
            .put(`/api/rider/${id}`, payload)
            .then((response) => {
              setLoading(false);
              alert("User successfully updated!");
              history.push("/");
            })
            .catch((err) => {
              console.log(err);
              alert("oh no! something went wrong");
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
          <form>
            <TextField
              name="name"
              fullWidth
              value={values.name}
              className={classes.input}
              label="Name"
              onChange={handleChange}
              variant="outlined"
              onBlur={handleBlur}
            />
            <Autocomplete
              name="township"
              options={townships}
              value={values.township}
              onBlur={handleBlur}
              className={classes.input}
              getOptionSelected={(option, value) => {
                values.township = value;
              }}
              onChange={(e, newValue) => {
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
              name="phoneNumber"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phoneNumber}
              className={classes.input}
              label="Phone number"
              variant="outlined"
            />
            <Typography variant="h6" className={classes.input}>
              Your previous shops
            </Typography>
            {data.availableShops.map((shop, i) => (
              <Chip
                color="secondary"
                key={i}
                variant="outlined"
                label={shop.name}
                className={classes.chip}
              />
            ))}
            <Typography variant="h6" className={classes.input}>
              Edit your shops
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
              disabled={shopName.length === 0}
            >
              Add shop
            </Button>
            {loading ? <Spinner /> : null}
            <Button
              type="submit"
              disabled={shops.length === 0}
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
  ) : (
    <Spinner />
  );
};

export default RiderEdit;
