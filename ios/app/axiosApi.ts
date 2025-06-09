import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://192.168.0.106:8000',
});

export default axiosApi;