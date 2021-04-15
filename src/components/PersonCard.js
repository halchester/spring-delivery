import {
  Box,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import Township from "./UI/Township";
import Shop from "./UI/Shop";

const useStyle = makeStyles((theme) => ({
  shopContainer: {
    padding: "0.3rem",
    backgroundColor: "#ddd",
    marginBottom: "0.2rem",
  },
  personContainer: {
    padding: "0.5rem",
  },
  foodListContainer: {
    margin: "0.3rem 0",
  },
  chip: {
    margin: theme.spacing(0.3),
  },
}));

const PersonCard = ({ person }) => {
  const classes = useStyle();
  const history = useHistory();

  return person ? (
    <Card
      className={classes.personContainer}
      onClick={() => {
        history.push(`/info/${person.uniqueId}`);
      }}
    >
      <CardHeader title={person.name} subheader={person.phoneNumber} />
      <CardContent>
        <Typography variant="h5">
          <strong>
            <Township township={person.township} />
          </strong>
        </Typography>
        <Box className={classes.foodListContainer}>
          <Shop availableShops={person.availableShops} />
        </Box>
      </CardContent>
    </Card>
  ) : null;
};

export default PersonCard;
