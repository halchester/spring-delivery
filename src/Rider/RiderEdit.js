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
import { MandalayData, YangonData } from "../utils/townshipData";
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

  console.log(data);

  return status === "success" ? (
    <Box>
      <Typography variant="h5">
        Edit your profile <strong>{data.name}</strong>
      </Typography>
      <Formik
        initialValues={data}
        validationSchema={riderSignUpValidation}
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
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              fullWidth
              value={values.name}
              className={classes.input}
              label="နာမည်"
              onChange={handleChange}
              variant="outlined"
              onBlur={handleBlur}
              error={touched.name && errors.name}
              helperText={errors.name}
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
              error={touched.detail && errors.detail}
              helperText={errors.detail}
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
              error={touched.phoneNumber && errors.phoneNumber}
              helperText={errors.phoneNumber}
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
              error={touched.expectedMoney && errors.expectedMoney}
              helperText={errors.expectedMoney}
            />
            <hr />

            <Typography variant="h6" className={classes.input} gutterBottom>
              ပို့ဆောင်ပေးမည့် မြို့နယ်များကို ပြန်လည်ပြင်ဆင်ရန်
            </Typography>
            <Autocomplete
              multiple
              value={townships}
              label="မြို့နယ်"
              filterSelectedOptions
              options={data.state === "Yangon" ? YangonData : MandalayData}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="မြို့နယ်" variant="outlined" />
              )}
              onChange={(e, newValue) => {
                setTownships(newValue);
              }}
              className={classes.input}
            />

            <hr />
            <Typography variant="h6" className={classes.input} gutterBottom>
              ယခင်ရွေးချယ်ထားပြီးသည့် စားသောက်ဆိုင် / ဈေးဆိုင်များ
            </Typography>
            {data.availableShops.length === 0 ? (
              <Typography align="left" color="secondary">
                မရှိသေးပါ :( အောက်တွင်ထပ်ထည့်ရန်
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

            <Typography variant="h6" className={classes.input} gutterBottom>
              စားသောက်ဆိုင် / ဈေးဆိုင်များ ပြန်လည်ပြင်ဆင်ရန်
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
              fullWidth
              onClick={handleSubmit}
              disabled={values.township.length === 0}
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
