/* eslint-disable no-restricted-syntax */
import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ReactRouterPropTypes from 'react-router-prop-types';
import Masonry from 'react-masonry-css';
import { getAllRiders } from '../../api/query';
import PersonCard from '../../components/PersonCard';
import Spinner from '../../utils/Spinner/Spinner';

const useStyle = makeStyles({
  bodyContainer: {
    marginTop: '1rem',
  },
  container: {
    marginTop: '0.5rem',
  },
  input: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const CustomerByState = (props) => {
  const classes = useStyle();
  const [query, setQuery] = useState('');
  const { status, data } = useQuery('getAllRiders', getAllRiders);
  const stateName = props.match.params.id;

  const searchTownship = (data, query) => {
    const result = [];
    for (const i of data) {
      for (const j of i.township) {
        if (j.toLowerCase().includes(query)) {
          result.push(i);
        }
      }
    }
    return result;
  };

  return status === 'success' ? (
    <Box component="div" className={classes.container}>
      <TextField
        fullWidth
        variant="outlined"
        className={classes.input}
        label="Search your township!"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Typography variant="h6" gutterBottom>
        မှာယူ/ပို့ဆောင်လိုသည့် မြို့နယ်ကို ရေးထည့်ပြီး rider ရွေးချယ်ပါ။
      </Typography>

      <Typography variant="h6">
        Total Riders in
        {' '}
        {stateName}
        {' '}
        :
        {' '}
        <strong>
          {data.filter((item) => item.state.toLowerCase() === stateName).length}
          {' '}
          riders
        </strong>
      </Typography>

      <hr />
      {data.filter((data) => data.state.toLowerCase() === stateName).length
      === 0 ? (
        <>
          <Typography
            color="secondary"
            align="center"
            variant="h5"
            className={classes.input}
          >
            No riders registered in
            {' '}
            {stateName}
            {' '}
            :(
          </Typography>
          <Typography
            color="secondary"
            align="center"
            variant="h5"
            className={classes.input}
          >
            {stateName}
            {' '}
            အတွက် rider မရှိသေးပါ :(
          </Typography>
        </>
        ) : (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {query
              ? searchTownship(data, query)
                .filter((data) => data.state.toLowerCase() === stateName)
                .map((person) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    key={person.uniqueId}
                  >
                    <PersonCard person={person} />
                  </Grid>
                ))
              : data
                .filter((data) => data.state.toLowerCase() === stateName)
                .map((person) => (
                  <div
                    key={person.uniqueId}
                  >
                    <PersonCard person={person} />
                  </div>
                ))}
          </Masonry>
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

CustomerByState.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default CustomerByState;
