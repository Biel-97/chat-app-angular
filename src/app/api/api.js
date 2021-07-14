import axios from 'axios';
import {BACK_END_URL} from '../../../env.js'

    let _BackEndRoot = BACK_END_URL

const api = axios.create({
    baseURL: _BackEndRoot
});

export default api;
