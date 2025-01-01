import axios from 'axios';
import { API_ROUTES } from '../utils/router.js';

export default axios.create({
  baseURL: API_ROUTES.base,
});
/*
const apiPrivate = axios.create({
  baseURL: API_ROUTES.base,
});

apiPrivate.interceptors.request.use();

apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) =>
);
*/

/*
export default axios.create({
  baseURL: API_ROUTES.base,
});
*/

// http://localhost:5001
