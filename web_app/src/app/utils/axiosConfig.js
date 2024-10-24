// First we need to import axios.js
import axios from 'axios';
// import Cookies from "js-cookie";

// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://localhost/KiloShare'
});

// const jwtToken = Cookies.get("jwt");

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = `Baerer ${jwtToken}`;

export default instance;