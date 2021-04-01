import axios from 'axios';
const serverUrl = 'http://localhost:8080'

const api = axios.create({
    baseURL: serverUrl
});

export default api;
