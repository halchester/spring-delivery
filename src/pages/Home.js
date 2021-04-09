import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  root: {
    marginTop: "1rem",
  },
  chooseContainer: {
    marginTop: "3rem",
  },
  button: {
    marginBottom: "1rem",
  },
});

const Home = () => {
  const classes = useStyle();
  const history = useHistory();
  return (
    <Box className={classes.root}>
      <Typography variant="h3" align="center" color="primary">
        Spring
      </Typography>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Snacks
      </Typography>
      <Box className={classes.chooseContainer}>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          fullWidth
          onClick={() => history.push("/rider")}
        >
          Rider
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          fullWidth
          onClick={() => history.push("/customer")}
        >
          Customer
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
