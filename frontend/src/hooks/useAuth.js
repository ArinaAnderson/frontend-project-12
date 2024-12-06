import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext.js';

const useAuth = () => useContext(AuthContext);

export default useAuth;
