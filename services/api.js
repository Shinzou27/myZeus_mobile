import axios from "axios";


const api = axios.create({
  baseURL: 'http://172.18.9.168:3333',
});


export { api }