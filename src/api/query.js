import { QueryClient } from 'react-query';
import axios from './index';

export const queryClient = new QueryClient();

export const getAllRiders = async () => {
	const response = await axios.get('api/riders');
	return response.data.data;
};

export const getOneRider = async ({ queryKey }) => {
	const response = await axios.get(`api/rider/${queryKey[0]}`);
	return response.data.data;
};
