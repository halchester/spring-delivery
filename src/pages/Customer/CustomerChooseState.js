import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  container: {
    marginTop: "4rem",
  },
  input: {
    marginTop: "1rem",
  },
});

const CustomerChooseState = () => {
  const classes = useStyle();
  const history = useHistory();

  const [stateName, setStateName] = useState("");

  return (
    <Box className={classes.container}>
      <Typography align="center" variant="h6">
        Choose your state or division
      </Typography>
      <Typography align="center">
        မိမိတိုင်းဒေသကြီး (သို့) ပြည်နယ်ရွေးပါ
      </Typography>
      <Autocomplete
        value={stateName}
        label="တိုင်းဒေသကြီး/ပြည်နယ်"
        options={["Yangon", "Mandalay"]}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="တိုင်းဒေသကြီး/ပြည်နယ်"
            variant="outlined"
          />
        )}
        onChange={(e, newValue) => {
          e.preventDefault();
          setStateName(newValue);
        }}
        className={classes.input}
      />
      <Button
        fullWidth
        className={classes.input}
        disabled={!stateName}
        variant="outlined"
        color="secondary"
        onClick={() => history.push(`/customer/${stateName.toLowerCase()}`)}
      >
        Continue
      </Button>
    </Box>
  );
};

export default CustomerChooseState;
