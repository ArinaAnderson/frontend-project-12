import React, { useRef, useState, useEffect } from 'react';
import Channels from '../containers/Channels.js';
import ChannelWindow from '../containers/ChannelWindow.js';

const Chat = () => (
  <section className="chat-page">
    <Channels />
  </section>
);

export default Chat;
