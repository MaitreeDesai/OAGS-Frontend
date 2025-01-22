import axios from 'axios';


console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
