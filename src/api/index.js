import axios from "axios";

const apiEndPoint = "http://localhost:8000";

export default axios.create({
  baseURL: apiEndPoint,
});
