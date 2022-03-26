import axios from 'react-native-axios';

const axiosInstance = axios.create({
  baseURL: 'https://imdb.hriks.com',
});
export default axiosInstance;
