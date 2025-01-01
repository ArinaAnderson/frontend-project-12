import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCurrentChannel, showModal, setRealTimeDataUpdateError } from '../store/slices/ui.js';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';

import Skeleton from '../components/Skeleton.js';
import Channel from '../components/Channel.js';
import ChannelWindow from './ChannelWindow.js';

import './Channels.css';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data, error, isLoading: isGetChannelsLoading } = useGetChannelsQuery();

  const currentChannel = useSelector((state) => state.ui.currentChannel);

  const { realTimeDataUpdateError } = useSelector((state) => state.ui);
  if (realTimeDataUpdateError) {
    toast.error(t('errors.noNetwork'));
    dispatch(setRealTimeDataUpdateError(null));
  }

  const [isChannelsListOpen, setIsChannelsListOpen] = useState(true);

  const handleChannelSelect = (id, name) => {
    setIsChannelsListOpen(false);
    dispatch(setCurrentChannel({ name, id }));
  };

  if (error) {
    const errorMessageText = error?.status
      ? t('errors.dataLoadError')
      : t('errors.noNetwork');
    toast.error(errorMessageText, { autoClose: 8000 });
  }

  const content = isGetChannelsLoading
    ? <Skeleton times={5} className="skeleton--w-90" />
    : (
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
      </ul>
    );
  return (
    <section className="chat">
      <div className={cn('channels-list', { 'channels-list--closed': !isChannelsListOpen })}>
        <div className="channels-list__header">
          <b>{t('channelsList.headline')}</b>
          <button
            onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null, channelName: null }))}
            disabled={isGetChannelsLoading}
            type="button"
            className="channels-list__add-channel-btn"
          >
            {t('channelsList.addChannelBtn')}
          </button>
          <button
            onClick={() => setIsChannelsListOpen(!isChannelsListOpen)}
            type="button"
            className={cn('channels-list__toggle-btn', {
              'channels-list__toggle-btn channels-list__toggle-btn--to-close': isChannelsListOpen,
              'channels-list__toggle-btn channels-list__toggle-btn--to-open': !isChannelsListOpen,
            })}
          >
            {isChannelsListOpen
              ? t('channelsList.toggleChannelsList.hide')
              : t('channelsList.toggleChannelsList.show')}
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
};

export default Channels;
