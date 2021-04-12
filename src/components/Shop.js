import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const Shop = ({ availableShops }) => {
  return (
    <React.Fragment>
      {availableShops.length > 2 ? (
        <>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FastfoodIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography>{availableShops[0].name}</Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FastfoodIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography>{availableShops[1].name}</Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MoreHorizIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography>
                <strong>{availableShops.length - 2 + " more"}</strong>
              </Typography>
            </ListItemText>
          </ListItem>
        </>
      ) : (
        availableShops.map((shop, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar>
                <FastfoodIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography>{shop.name}</Typography>
            </ListItemText>
          </ListItem>
        ))
      )}
    </React.Fragment>
  );
};

export default Shop;
