// First we need to import axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.0.2.2/KiloShare/api/v1",
  // baseURL: 'https://my-hours.net/api/public/index.php/api',
  timeout: 20000
});

export default instance;
