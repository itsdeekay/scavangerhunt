import axios from 'axios';
const API = axios.create({ baseURL: 'https://scavangerhunt.herokuapp.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});


export const fetchAlerts = () => API.get('/alerts');
export const getAlertsByPin = (pincodes) => API.get('/alerts/match',{params:{pincodes}});
export const createAlert = (newAlert) => API.post('/alerts', newAlert);
export const updateAlert = (id, branchId) => API.patch(`/alerts/${id}`, {branchId});

export const signIn = (formData) => API.post('/branches/signin', formData);
export const getBranches = (formData) => API.get(`/branches/${formData.pincode}`);