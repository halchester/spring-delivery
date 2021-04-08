import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";

// TODOS:
// []: give each rider ID to remember and edit their profile
// []: new user -> create a new profile to display

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
  const history = useHistory();
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
      >
        Continue
      </Button>
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
