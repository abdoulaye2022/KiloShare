// First we need to import axios.js
import axios from "axios";

const instance = axios.create({
//   baseURL: "http://10.0.2.2/KiloShare/api/v1",
  baseURL: 'http://m2acode.com/api/v1',
  timeout: 20000
});

export default instance;
