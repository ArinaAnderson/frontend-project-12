import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, setModalInfo } from '../store/slices/ui.js';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import Skeleton from '../components/Skeleton.js';
import Channel from '../components/Channel.js';
import ChannelWindow from './ChannelWindow.js';

import { toast } from 'react-toastify';
import { setSocketError } from '../store/slices/ui.js';

import './Channels.css';

const Channels = () => {
  const { t } = useTranslation();

  const { data, error, isLoading: isGetChannelsLoading } = useGetChannelsQuery();

  const dispatch = useDispatch();

  const socketError = useSelector((state) => state.ui.socketConnectionError);
  if (socketError) {
    toast.error(t('errors.noNetwork'));
    dispatch(setSocketError(null));
  }

  if (error) {
    const errorMessageText= e?.response?.status ?
      t('errors.dataLoadError') :
      t('errors.noNetwork');
    toast.error(errorMessageText, { autoClose: 8000 });
  }

  const currentChannel = useSelector((state) => state.ui.currentChannel);

  const [isChannelsListOpen, setIsChannelsListOpen] = useState(true);

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
