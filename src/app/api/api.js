import axios from 'axios';
    // let _BackEndRoot = 'http://localhost:8080'
    let _BackEndRoot = 'https://whatsapp-back-clone.herokuapp.com'

const api = axios.create({
    baseURL: _BackEndRoot
});

export default api;
