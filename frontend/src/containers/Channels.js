import React, { useState, useLayoutEffect } from 'react';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import cn from 'classnames';

import Skeleton from '../components/Skeleton.js';
import ChannelWindow from './ChannelWindow.js';
import Channel from '../components/Channel.js';

import './Channels.css';

const Channels = () => {
  const { data, error, isLoading } = useGetChannelsQuery();
  // console.log('CHANNELS DATA', data);
  const [currentChannel, setCurrentChannel] = useState({});
  const [isChannelListOpen, setIsChannelListOpen] = useState(true);

  useLayoutEffect(() => {
    if (data) {
      setCurrentChannel({ id: data[0].id, name: data[0].name });
    }
  }, [data]);

  /*
  const MAX_MOBILE_WIDTH = 500;
  const [isWidthMobile, setIsWidthMobile] = useState(() => window.innerWidth < MAX_MOBILE_WIDTH);
  const handleWindowResize = () => {
    console.log('RESIZE', window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  */

  const handleChannelSelect = (id, name) => {
    setCurrentChannel({ name, id });
  };

  const content = isLoading ?
    <Skeleton times={5} className='skeleton--w-90'/> :
    <ul className="channels-list__items">
      { data.map(({ id, name, removable }) => (
        <Channel
          key={id}
          id={id}
          name={name}
          removable={removable}
          isCurrent={currentChannel.id === id}
          handleChannelSelect={handleChannelSelect}
        />
      ))}
    </ul>;
  return (
    <section className="chat">
      <div className={cn('channels-list', { 'channels-list--closed': !isChannelListOpen})}>
        <div className="channels-list__header">
          <b>Каналы</b>
          <button disabled={isLoading} type="button" className="channels-list__add-channel-btn">Добавить канал</button>
          <button
            onClick={() => setIsChannelListOpen(!isChannelListOpen)}
            type="button"
            className={cn(
              'channels-list__toggle-btn', {
              'channels-list__toggle-btn channels-list__toggle-btn--to-close': isChannelListOpen,
              'channels-list__toggle-btn channels-list__toggle-btn--to-open': !isChannelListOpen,
            })}
          >
            {isChannelListOpen ? 'Скрыть список каналов' : 'Открыть список каналов'}
          </button>
        </div>
        {content}
      </div>
      <ChannelWindow
        channelId={currentChannel.id}
        channelName={currentChannel.name}
      />
    </section>
  );
}

export default Channels;
