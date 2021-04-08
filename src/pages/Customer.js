import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import data from "../data";

const useStyle = makeStyles({
  bodyContainer: {
    marginTop: "1.5rem",
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

  useEffect(() => {}, [query]);

  return (
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
        {data
          // eslint-disable-next-line
          .filter((person) => {
            if (query === "") return person;
            else if (person.township.toLowerCase().includes(query))
              return person;
          })
          .map((person, i) => (
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
  );
};

export default Customer;
