import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost/KiloShare",
  baseURL: 'https://m2acode.com',
  timeout: 5000 
});

export default instance;
