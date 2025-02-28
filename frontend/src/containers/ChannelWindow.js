import React from 'react';
import ChannelNewMessage from './ChannelNewMessage.js';
import ChannelMessages from './ChannelMessages.js';

import './ChannelChat.css';

const ChannelWindow = ({ channelName, channelId }) => (
  <div className="channel-window">
    <ChannelMessages channelName={channelName} channelId={channelId} />
    <ChannelNewMessage channelId={channelId} />
  </div>
);

export default ChannelWindow;
