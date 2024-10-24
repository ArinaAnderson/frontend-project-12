import axios from 'axios';
import { API_ROUTES } from '../utils/router.js';

export default axios.create({
  baseURL: API_ROUTES.base,
});

// http://localhost:5001
