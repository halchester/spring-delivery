import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PropTypes from 'prop-types';

const Shop = ({ availableShops }) => (
  <>
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
              <strong>{`${availableShops.length - 2} more`}</strong>
            </Typography>
          </ListItemText>
        </ListItem>
      </>
    ) : (
      availableShops.map((shop) => (
        <ListItem key={shop.name}>
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
  </>
);

Shop.propTypes = {
  availableShops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Shop;
