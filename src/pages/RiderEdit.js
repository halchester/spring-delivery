import {
  Box,
  Button,
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
import { useState } from "react";

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
  const { status, data } = useQuery(id, getOneRider);
  console.log(status, data);

  return status === "success" ? (
    <Box>
      <Typography variant="h5">
        Edit your profile <strong>{data.name}</strong>
      </Typography>
      <Formik initialValues={data} onSubmit={(values) => console.log(values)}>
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
            />
            <Autocomplete
              name="township"
              options={townships}
              value={values.township}
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
              onChange={handleChange}
              value={values.phoneNumber}
              className={classes.input}
              label="Phone number"
              variant="outlined"
            />
            <Typography variant="h6" className={classes.input}>
              Edit your shops
            </Typography>
          </form>
        )}
      </Formik>
    </Box>
  ) : (
    <Spinner />
  );
};

export default RiderEdit;
