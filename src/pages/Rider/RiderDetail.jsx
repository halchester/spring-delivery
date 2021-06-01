import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import ReactRouterPropTypes from 'react-router-prop-types';
import Masonry from 'react-masonry-css';
import { getOneRider } from '../../api/query';
import Spinner from '../../utils/Spinner/Spinner';

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: '2rem',
  },
  cardContainer: {
    padding: '0rem',
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

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

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
      <p className="text-lg font-bold">
        Delivery fees :
        {' '}
        <strong style={{ color: '#ce1212' }}>{data.expectedMoney}</strong>
      </p>

      <Divider />

      <div className="my-4">
        <Typography variant="h5" align="center">
          <strong>Available Shops and Delivery &nbsp; &#8595; </strong>
        </Typography>
      </div>

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
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.availableShops.map((shop) => (
            <Grid key={shop.name}>
              <Card className={classes.cardContainer}>
                <CardHeader
                  title={<p className="text-lg font-semibold">{shop.name}</p>}
                  subheader={(
                    <p className="text-gray-500 text-sm mt-2">
                      {shop?.detail ? shop.detail : null}
                    </p>
                  )}
                />
              </Card>
            </Grid>
          ))}
        </Masonry>
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
