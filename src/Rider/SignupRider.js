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
import { MandalayData, YangonData } from "../utils/townshipData.js";
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

  // For state,
  const [stateName, setStateName] = useState("");

  // For townships
  const [townships, setTownships] = useState([]);

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

  const handleDelete = (shopToDelete) => () => {
    setShops((shop) => shop.filter((shop) => shop.name !== shopToDelete.name));
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

  const formikInitialValues = {
    name: "",
    detail: "",
    state: "",
    township: [],
    phoneNumber: "",
    expectedMoney: 1500,
    availableShops: [],
  };

  return (
    <Box component="div" className={classes.container}>
      <Typography variant="h5">
        <strong>Create a new rider profile!</strong>
      </Typography>
      <Formik
        validationSchema={riderSignUpValidation}
        // enableReinitialize={true}
        initialValues={formikInitialValues}
        onSubmit={async (
          {
            name,
            township,
            phoneNumber,
            availableShops,
            detail,
            expectedMoney,
            state,
          },
          { resetForm }
        ) => {
          setLoading(true);
          township = townships;
          availableShops = shops;
          state = stateName;
          const payload = {
            name,
            picURL: imageURL,
            state,
            township,
            expectedMoney,
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
              label="နာမည်"
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
              label="မိမိအကြောင်းအနည်းငယ်ဖော်ပြရန်"
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
              label="ဖုန်းနံပါတ်"
              className={classes.input}
              onChange={handleChange}
              fullWidth
              error={touched.phoneNumber && errors.phoneNumber}
              helperText={errors.phoneNumber}
              onBlur={handleBlur}
            />
            <TextField
              variant="outlined"
              name="expectedMoney"
              type="number"
              defaultValue={values.expectedMoney}
              value={values.expectedMoney}
              label="အခေါက်ကြေး"
              className={classes.input}
              onChange={handleChange}
              fullWidth
              error={touched.expectedMoney && errors.expectedMoney}
              helperText={errors.expectedMoney}
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
            <Typography className={classes.input} variant="h6" gutterBottom>
              မိမိပို့ဆောင်နိုင်မည့် မြို့နယ်များကို ၁ ခုချင်းရွေးချယ်ပါ
            </Typography>
            <Autocomplete
              value={stateName}
              label="တိုင်းဒေသကြီး"
              options={["Yangon", "Mandalay"]}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="တိုင်းဒေသကြီး"
                  variant="outlined"
                />
              )}
              onChange={(e, newValue) => {
                e.preventDefault();
                setStateName(newValue);
              }}
              className={classes.input}
            />
            {stateName ? (
              <Autocomplete
                multiple
                value={townships}
                label="မြို့နယ်"
                filterSelectedOptions
                options={stateName === "Yangon" ? YangonData : MandalayData}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="မြို့နယ်" variant="outlined" />
                )}
                onChange={(e, newValue) => {
                  setTownships(newValue);
                }}
                className={classes.input}
              />
            ) : null}

            <Typography variant="h6" className={classes.input} gutterBottom>
              မိမိပို့ဆောင်နိုင်မည့် စားသောက်ဆိုင် / ဈေးဆိုင်များကိုရေးထည့်ပါ
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
              label="ဆိုင်နာမည်"
              className={classes.input}
              onChange={(e) => setShopName(e.target.value)}
              fullWidth
            />
            <TextField
              variant="outlined"
              // name="phoneNumber"
              value={shopDescription}
              label="ဆိုင်အကြောင်း"
              helperText="လူသိများပါက ဆိုင်အကြောင်းမထည့်လည်းရပါတယ် "
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
              ဆိုင်ထည့်ရန်
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
              disabled={townships.length === 0 || imageURL.length === 0}
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
