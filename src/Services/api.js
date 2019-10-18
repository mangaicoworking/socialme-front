import axios from 'axios';

//const api = axios.create({ baseURL: 'https://socialme-api.herokuapp.com/ergCNTis' });
const api = axios.create({ 
    baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
    //headers: {'X-Custom-Header': 'foobar'}
});

export default api;