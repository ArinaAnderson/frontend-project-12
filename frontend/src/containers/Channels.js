import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, setModalInfo, addChannelName } from '../store/slices/ui.js';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import Skeleton from '../components/Skeleton.js';
import ChannelWindow from './ChannelWindow.js';
import Channel from '../components/Channel.js';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Channels.css';

const Channels = () => {
  const { t } = useTranslation();

  const { data, error, isLoading: isGetChannelsLoading, isUninitialized } = useGetChannelsQuery();

  const dispatch = useDispatch();

  if (error) {
    console.log(error.response);
  }

  const currentChannel = useSelector((state) => state.ui.currentChannel);

  const [isChannelsListOpen, setIsChannelsListOpen] = useState(true);
  //console.log('CHANNELS DATA', data, currentChannel);

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
          <b>{t('channelsList.headline')}</b>
          <button
            onClick={() => dispatch(setModalInfo({modalType: 'adding', channelId: null, channelName: null }))}
            disabled={isGetChannelsLoading}
            type="button"
            className="channels-list__add-channel-btn"
          >
            {t('channelsList.addChannelBtn')}
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
            {isChannelsListOpen ?
              t('channelsList.toggleChannelsList.hide') :
              t('channelsList.toggleChannelsList.hide')
            }
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
