import {
  Box, Button, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
  root: {
    marginTop: '2rem',
  },
  chooseContainer: {
    marginTop: '2rem',
  },
  button: {
    marginBottom: '1rem',
  },
  footer: {
    marginTop: '2rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Home = () => {
  const classes = useStyle();
  const history = useHistory();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <img
          src="/main.PNG"
          style={{ height: '300px', width: '300px', borderRadius: '50%' }}
          alt="logo"
        />
      </Box>
      <Box className={classes.chooseContainer}>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          fullWidth
          onClick={() => history.push('/rider')}
        >
          Rider
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          fullWidth
          onClick={() => history.push('/customer')}
        >
          Customer
        </Button>
        <hr />
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <Typography color="secondary" variant="h6" align="center">
            Learn more about Spring Delivery &rarr;
          </Typography>
        </Link>
        <Box className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Made with ❤️ by
            {' '}
            <a
              href="https://github.com/halchester"
              style={{ textDecoration: 'underline', color: 'black' }}
            >
              halchester
            </a>
          </Typography>
          <Typography variant="h6" align="center">
            Version :
            {' '}
            <strong>1.0.3</strong>
          </Typography>
          {/* <Typography variant="h6" align="center">
            Source on{" "}
            <a
              href="https://github.com/halchester/spring-snacks"
              style={{ textDecoration: "underline", color: "black" }}
            >
              Github
            </a>
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
