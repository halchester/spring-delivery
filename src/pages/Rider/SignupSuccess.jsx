/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

const SignupSuccess = (props) => {
  const { id } = props.match.params;
  const history = useHistory();
  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        style={{ marginTop: '8rem' }}
        gutterBottom
      >
        သင့် id :
        {' '}
        <strong>{id}</strong>
      </Typography>
      <hr />
      <Typography align="center" variant="body2">
        မိမိကိုယ်ပိုင် id no. ကို screenshot ရိုက်၍ဖြစ်စေ မှတ်စုထဲတွင် ဖြစ်စေ
        မှတ်ထားပေးပါ
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ marginTop: '1rem' }}
        onClick={() => {
          history.push(`/info/${id}`);
        }}
      >
        profile ကြည့်ရန်
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ marginTop: '1rem' }}
        onClick={() => {
          history.push('/');
        }}
      >
        ပြန်ထွက်
      </Button>
    </Box>
  );
};

SignupSuccess.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default SignupSuccess;
