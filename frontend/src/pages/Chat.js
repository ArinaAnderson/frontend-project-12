import React, { useRef, useState, useEffect } from 'react';
import Channels from '../containers/Channels.js';
import ChannelWindow from '../containers/ChannelWindow.js';
// import Skeleton from '../components/Skeleton.js';

const Chat = () => (
  <section className="chat">
    <Channels />
    <ChannelWindow />
  </section>
);

export default Chat;

// <Skeleton times={5} className='skeleton--w-50 skeleton--ml-25'/>
