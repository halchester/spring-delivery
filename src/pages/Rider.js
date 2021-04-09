import {
  Box,
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "../api/index";
import Spinner from "../utils/Spinner/Spinner";

// TODOS:
// []: give each rider ID to remember and edit their profile
// [x]: new user -> create a new profile to display

const useStyle = makeStyles({
  container: {
    marginTop: "0.5rem",
  },
  input: {
    marginTop: "1rem",
  },
  signup: {
    textDecoration: "underline",
  },
});

const Rider = () => {
  const classes = useStyle();
  const [id, setId] = useState("");
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();

  const searchUser = (id) => {
    setLoading(true);
    axios.get(`/api/rider/${id}`).then((response) => {
      if (response.data.data === null) {
        setLoading(false);
        setFound(false);
      } else {
        setFound(true);
        setLoading(false);
        setData(response.data.data);
      }
    });
  };
  return (
    <Box component="div" className={classes.container}>
      <Typography variant="h5" align="center">
        Edit your profile!
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        className={classes.input}
        label="Enter id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button
        className={classes.input}
        variant="contained"
        color="secondary"
        fullWidth
        type="submit"
        onClick={() => searchUser(id)}
        disabled={!id}
      >
        Continue
      </Button>
      {loading ? <Spinner /> : null}
      {found ? (
        <Box style={{ marginTop: "0.5rem" }}>
          <Typography variant="h6" align="center">
            <strong style={{ color: "green" }}>User found!</strong>
          </Typography>
          <Card style={{ padding: "0.5rem" }}>
            <Typography variant="h6">{data.name}</Typography>
            <Typography variant="h6">{data.phoneNumber}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => history.push(`/rider/edit/${data.uniqueId}`)}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{ marginLeft: "0.3rem" }}
              onClick={() => history.push(`/info/${data.uniqueId}`)}
            >
              View Profile
            </Button>
          </Card>
        </Box>
      ) : (
        <Typography
          variant="h6"
          align="center"
          style={{ marginTop: "0.5rem" }}
          color="secondary"
        >
          <strong>User Not found!</strong>
        </Typography>
      )}
      <hr />
      <Typography variant="h5" align="center" className={classes.input}>
        New rider? Welcome to spring snack! Create a new profile{" "}
        <strong
          className={classes.signup}
          onClick={() => {
            history.push("/rider/signup");
          }}
        >
          here
        </strong>
        !
      </Typography>
    </Box>
  );
};

export default Rider;
