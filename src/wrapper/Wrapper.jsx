import { Box } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Wrapper.module.css';

const Wrapper = ({ children }) => (
  <Box className={styles.container}>
    <Box style={{ margin: '1rem' }}>{children}</Box>
  </Box>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
