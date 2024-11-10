import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, setModalType, addChannelName } from '../store/slices/ui.js';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import cn from 'classnames';

import Skeleton from '../components/Skeleton.js';
import ChannelWindow from './ChannelWindow.js';
import Channel from '../components/Channel.js';

import './Channels.css';

const Channels = () => {
  const { data, error, isLoading: isGetChannelsLoading, isUninitialized } = useGetChannelsQuery();

  const dispatch = useDispatch();

  const currentChannel = useSelector((state) => state.ui.currentChannel);
  // console.log('CHANNELS DATA', data);
  const [isChannelsListOpen, setIsChannelsListOpen] = useState(true);
  /*
  if (data) {
    const names = data.map((el) => el.name);
    dispatch(addChannelName(names));
    console.log('NAMES', names);
  }
  */

  /*
  useEffect(() => {

  }, [isUninitialized]);
  */

  const handleChannelSelect = (id, name) => {
    dispatch(setCurrentChannel({ name, id }));
  };

  const content = isGetChannelsLoading ?
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
      <div className={cn('channels-list', { 'channels-list--closed': !isChannelsListOpen})}>
        <div className="channels-list__header">
          <b>Каналы</b>
          <button
            onClick={() => dispatch(setModalType('adding'))}
            disabled={isGetChannelsLoading}
            type="button"
            className="channels-list__add-channel-btn"
          >
            Добавить канал
          </button>
          <button
            onClick={() => setIsChannelsListOpen(!isChannelsListOpen)}
            type="button"
            className={cn(
              'channels-list__toggle-btn', {
              'channels-list__toggle-btn channels-list__toggle-btn--to-close': isChannelsListOpen,
              'channels-list__toggle-btn channels-list__toggle-btn--to-open': !isChannelsListOpen,
            })}
          >
            {isChannelsListOpen ? 'Скрыть список каналов' : 'Открыть список каналов'}
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
