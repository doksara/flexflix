import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = () => response.data;
const requestType = {
    get = (url) => axios.get(url).then(responseBody);
    post = (url, body) => axios.post(url, body).then(responseBody); 
}

const Show = {
    getShows = () => requestType.get(`api/shows`);
};

export default {
    Show
}