import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllRiders } from "../../api/query";
import PersonCard from "../../components/PersonCard";
import Spinner from "../../utils/Spinner/Spinner";

const useStyle = makeStyles({
  bodyContainer: {
    marginTop: "1rem",
  },
  container: {
    marginTop: "0.5rem",
  },
  input: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
});

const CustomerByState = (props) => {
  const classes = useStyle();
  const [query, setQuery] = useState("");
  const { status, data } = useQuery("getAllRiders", getAllRiders);
  const stateName = props.match.params.id;

  const searchTownship = (data, query) => {
    let result = [];
    for (let i of data) {
      for (let j of i.township) {
        if (j.toLowerCase().includes(query)) {
          result.push(i);
        }
      }
    }
    return result;
  };

  return status === "success" ? (
    <Box component="div" className={classes.container}>
      <TextField
        fullWidth
        variant="outlined"
        className={classes.input}
        label="Search your township!"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Typography variant="h6">
        မှာယူ/ပို့ဆောင်လိုသည့် မြို့နယ်ကို ရေးထည့်ပြီး rider ရွေးချယ်ပါ။
      </Typography>

      <hr />
      {data.filter((data) => data.state === stateName).length === 0 ? (
        <>
          <Typography
            color="secondary"
            align="center"
            variant="h5"
            className={classes.input}
          >
            No riders registered in {stateName} :(
          </Typography>
          <Typography
            color="secondary"
            align="center"
            variant="h5"
            className={classes.input}
          >
            {stateName} အတွက် rider မရှိသေးပါ :(
          </Typography>
        </>
      ) : (
        <Grid container spacing={2} className={classes.bodyContainer}>
          {query
            ? searchTownship(data, query)
                .filter((data) => data.state === stateName)
                .map((person, i) => (
                  <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
                    <PersonCard person={person} />
                  </Grid>
                ))
            : data
                .filter((data) => data.state === stateName)
                .map((person, i) => (
                  <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
                    <PersonCard person={person} />
                  </Grid>
                ))}
        </Grid>
      )}

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

export default CustomerByState;
