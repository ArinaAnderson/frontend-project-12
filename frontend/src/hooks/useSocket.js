import { useContext } from 'react';
import SocketContext from '../contexts/SocketContext.js';

const useSocket = () => useContext(SocketContext);

export default useSocket;
