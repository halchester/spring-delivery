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
import { useEffect, useState } from "react";
import axios from "../api/index";
import { useHistory } from "react-router";
import townshipData from "../SignupRider/townships";

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

  // Get data from api and then set to app State and then push back in formik
  const [shops, setShops] = useState([]);
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");

  // Get data from api and then set to app State and then push back in formik
  const [townships, setTownships] = useState([]);
  const [tsp, setTsp] = useState("");

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
      setTownships(data.township);
    }
    // eslint-disable-next-line
  }, [status]);

  const handleDelete = (shopToDelete) => () => {
    setShops((shop) => shop.filter((shop) => shop.name !== shopToDelete.name));
  };

  const handleDeleteTsp = (shopToDelete) => () => {
    setTownships((shop) => shop.filter((shop) => shop !== shopToDelete));
  };

  const addNewTownshipHandler = (e) => {
    e.preventDefault();
    setTownships((prevTsps) => [...prevTsps, tsp]);
    setTsp("");
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
            detail: values.detail,
            phoneNumber: values.phoneNumber,
            township: townships,
            availableShops: shops,
            expectedMoney: values.expectedMoney,
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
              label="နာမည်"
              onChange={handleChange}
              variant="outlined"
              onBlur={handleBlur}
            />
            <TextField
              name="detail"
              fullWidth
              value={values.detail}
              className={classes.input}
              label="မိမိအကြောင်းအနည်းငယ်ဖော်ပြရန်"
              multiline
              rows={3}
              onChange={handleChange}
              variant="outlined"
              onBlur={handleBlur}
            />
            <TextField
              name="phoneNumber"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phoneNumber}
              className={classes.input}
              label="ဖုန်းနံပါတ်"
              variant="outlined"
            />
            <TextField
              name="expectedMoney"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.expectedMoney}
              className={classes.input}
              label="အခေါက်ကြေး"
              variant="outlined"
            />
            <hr />
            <Typography variant="h6" className={classes.input}>
              Your prvious townships
            </Typography>
            {data.township.map((item, i) => (
              <Chip
                color="secondary"
                key={i}
                variant="outlined"
                label={item}
                className={classes.chip}
              />
            ))}
            <Typography variant="h6" className={classes.input}>
              Edit townships
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
            <hr />
            <Typography variant="h6" className={classes.input}>
              Your previous shops
            </Typography>
            {data.availableShops.length === 0 ? (
              <Typography align="left">
                You have no shops :( Add shop below!
              </Typography>
            ) : (
              data.availableShops.map((shop, i) => (
                <Chip
                  color="secondary"
                  key={i}
                  variant="outlined"
                  label={shop.name}
                  className={classes.chip}
                />
              ))
            )}

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
