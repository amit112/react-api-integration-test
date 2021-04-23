import axios from 'axios';


const Api = axios.create({
    baseURL: `https://voxiot.com/`
});

Api.interceptors.request.use(
config => {
    debugger
    config.params = { ...config.params, token: 'cd164cdcee22ba3a0346f95b4f3c13c8' };
    return config;
}, error => {
    return error
});

Api.interceptors.response.use(
response => {
    debugger
    return response.data
}, error => {
    return error
});




export default Api;