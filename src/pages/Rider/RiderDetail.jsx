import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import ReactRouterPropTypes from 'react-router-prop-types';
import { getOneRider } from '../../api/query';
import Spinner from '../../utils/Spinner/Spinner';

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: '2rem',
  },
  cardContainer: {
    padding: '0.5rem',
  },
  chip: {
    margin: theme.spacing(0.3),
  },
  titleAndPic: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));

const RiderDetail = (props) => {
  const { id } = props.match.params;
  const classes = useStyle();
  const { status, data } = useQuery(id, getOneRider);

  return status === 'success' ? (
    <Box className={classes.container}>
      <Box className={classes.titleAndPic}>
        <Box>
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h5" color="secondary">
            <strong>{data.phoneNumber}</strong>
          </Typography>
        </Box>
        <Box>
          <Avatar src={data.picURL} style={{ width: '6rem', height: '6rem' }} />
        </Box>
      </Box>
      <Typography style={{ marginTop: '1rem' }} gutterBottom>
        {data.detail}
      </Typography>
      <Typography gutterBottom variant="h5">
        Delivery fees :
        {' '}
        <strong style={{ color: '#ce1212' }}>{data.expectedMoney}</strong>
      </Typography>
      <hr />

      <Typography variant="body2" align="center" gutterBottom>
        <strong>Available Shops and Delivery &nbsp; &#8595; </strong>
      </Typography>
      <Typography variant="h5" gutterBottom>
        <strong>
          {data.township.map((item) => (
            <Chip
              key={item}
              label={item}
              className={classes.chip}
              color="secondary"
              size="medium"
            />
          ))}
        </strong>
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {data.availableShops.map((shop) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={shop.name}>
              <Card className={classes.cardContainer}>
                <CardHeader
                  title={shop.name}
                  subheader={shop.detail ? shop.detail : ''}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  ) : (
    <Spinner />
  );
};

RiderDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default RiderDetail;
