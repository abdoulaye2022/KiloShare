import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/KiloShare'
    // baseURL: 'http://m2acode.com'
});

export default instance;