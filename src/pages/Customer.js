import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllRiders } from "../api/query";
import PersonCard from "../components/PersonCard";
import Spinner from "../utils/Spinner/Spinner";

const useStyle = makeStyles({
  bodyContainer: {
    marginTop: "1rem",
  },
  container: {
    marginTop: "0.5rem",
  },
  input: {
    marginTop: "1rem",
  },
});

const Customer = () => {
  const classes = useStyle();
  const [query, setQuery] = useState("");
  const { status, data } = useQuery("getAllRiders", getAllRiders);

  return status === "success" ? (
    <Box component="div" className={classes.container}>
      <Typography variant="h4">Select your location!</Typography>
      <TextField
        fullWidth
        variant="outlined"
        className={classes.input}
        label="Search in your township!"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Grid container spacing={2} className={classes.bodyContainer}>
        {data.map((person, i) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
            <PersonCard person={person} />
          </Grid>
        ))}
      </Grid>
      {query ? (
        <Typography align="center" variant="h6" className={classes.input}>
          <strong>No other users found near you :(</strong>
        </Typography>
      ) : null}
    </Box>
  ) : (
    <Spinner />
  );
};

export default Customer;
