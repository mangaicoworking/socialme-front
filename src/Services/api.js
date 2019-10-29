import axios from 'axios';

const token = localStorage.getItem('token');

//const api = axios.create({ baseURL: 'https://socialme-api.herokuapp.com/ergCNTis' });
const api = axios.create({ 
    baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
    //baseURL: 'http://192.168.2.28:3000/ergCNTis',
    headers: {'mundo-data-token': token}
});

export default api;