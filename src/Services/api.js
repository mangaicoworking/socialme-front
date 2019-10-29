import axios from 'axios';

let token = localStorage.getItem('token');
//let refreshToken = () => {return localStorage.getItem('token');}
const api = axios.create({ 
    //baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
    baseURL: 'http://192.168.2.28:3000/ergCNTis',
    headers: {'mundo-data-token': token}
});

export default api;
