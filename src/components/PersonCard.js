import {
  Avatar,
  Box,
  Card,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  shopContainer: {
    padding: "0.3rem",
    backgroundColor: "#ddd",
    marginBottom: "0.2rem",
  },
  personContainer: {
    padding: "1rem",
  },
  foodListContainer: {
    margin: "0.5rem 0",
  },
});

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
      <Typography variant="h5">{person.name}</Typography>
      <Typography variant="h5">
        <strong>{person.township}</strong>
      </Typography>
      <hr />
      <Typography gutterBottom variant="body2">
        Shops available for this person
      </Typography>
      <Box className={classes.foodListContainer}>
        {person.availableShops.map((shop, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar>
                <FastfoodIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={shop.name} />
          </ListItem>
        ))}
      </Box>
      {/* <Typography variant="h6" color="secondary">
        {person.phoneNumber}
      </Typography> */}
    </Card>
  ) : null;
};

export default PersonCard;
