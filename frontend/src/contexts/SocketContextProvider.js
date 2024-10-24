import { useMemo } from 'react';
import { io } from 'socket.io-client';
import SocketContext from './SocketContext.js';

const SocketContextProvider = ({ children }) => {
  const socket = io();

  const value = useMemo(() => {
    // methods that send data:
    const addNewMessage = (message, cb) => {
      socket.emit('newMessage', message, (response) => {
        cb(response);
      })
    };

    const addNewChannel = (channel, cb) => {
      socket.emit('newChannel', channel, (response) => {
        cb(response);
      })
    };

    return {
      addNewMessage,
      addNewChannel,
      socket,
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

