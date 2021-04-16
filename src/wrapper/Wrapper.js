import { Box } from '@material-ui/core';
import React from 'react';
import styles from './Wrapper.module.css';

const Wrapper = ({ children }) => {
	return (
		<Box className={styles.container}>
			<Box style={{ margin: '1rem' }}>{children}</Box>
		</Box>
	);
};

export default Wrapper;
