import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
    headers: {'mundo-data-token': localStorage.getItem('token')}
});

export default api;