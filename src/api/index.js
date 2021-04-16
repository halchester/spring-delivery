import axios from 'axios';

// const apiEndPoint = "http://localhost:8000";
const apiEndPoint = 'https://spring-snacks.herokuapp.com/';

export default axios.create({
	baseURL: apiEndPoint,
});
