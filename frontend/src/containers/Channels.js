import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import cn from 'classnames';

import Skeleton from '../components/Skeleton.js';
import ChannelWindow from './ChannelWindow.js';

const Channels = () => {
  const { data, error, isLoading } = useGetChannelsQuery();

  const [currentChannel, setCurrentChannel] = useState({});
  const [isChannelListOpen, setIsChannelListOpen] = useState(false);

  useLayoutEffect(() => {
    if (data) {
      setCurrentChannel(data[0]);
    }
  }, [data]);

  const handleChannelSelect = (id, name) => {
    setCurrentChannel({ name, id });
  };

  const content = isLoading ?
    <Skeleton times={5} className='skeleton--w-90'/> :
    <div className="channels-list__items-box">
      <ul className="channels-list__items">
        {data.map(({ id, name }) => (
          <li key={id} className={cn("channels-list__item", { "channels-list__item--current": Number(id) === Number(currentChannel.id)})}>
            <button
              type="button"
              onClick={(evt) => handleChannelSelect(id, name)}
              disabled={Number(id) === Number(currentChannel.id)}>
              <span>#</span>&nbsp;{name}
            </button>
          </li>
        ))}
      </ul>
      <button type="button">{isChannelListOpen ? 'Скрыть список каналов' : 'Открыть список каналов'}</button>
    </div>;
  
  return (
    <section className="chat">
      <div className="channels-list">
        <div className="channels-list__header">
          <b>Каналы</b>
          <button disabled={isLoading} type="button" className="channels-list__add-channel-btn">Добавить канал</button>
        </div>
        {content}
      </div>
      <ChannelWindow channelId={currentChannel.id} channelName={currentChannel.name} />
    </section>
  );
}

export default Channels;
