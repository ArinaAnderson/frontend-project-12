import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, setModalInfo } from '../store/slices/ui.js';
import { useGetChannelsQuery } from '../store/apis/channelsApi.js';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/router.js';

import Skeleton from '../components/Skeleton.js';
import Channel from '../components/Channel.js';
import ChannelWindow from './ChannelWindow.js';

import { toast } from 'react-toastify';
import { setSocketError } from '../store/slices/ui.js';
// import updateLocalStorage from '../utils/localStorage.js';

import './Channels.css';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data, error, isLoading: isGetChannelsLoading } = useGetChannelsQuery();

  const currentChannel = useSelector((state) => state.ui.currentChannel);

  const socketError = useSelector((state) => state.ui.socketConnectionError);
  if (socketError) {
    toast.error(t('errors.noNetwork'));
    dispatch(setSocketError(null));
  }

  const [isChannelsListOpen, setIsChannelsListOpen] = useState(true);

  const handleChannelSelect = (id, name) => {
    setIsChannelsListOpen(false);
    dispatch(setCurrentChannel({ name, id }));
  };

  if (error) {
    if (error.status === 401) {
      console.log('EXPIRED NEWLY CREATED USER', error.statusCode, error.status, localStorage.getItem('auth'));
      // {"statusCode":401,"error":"Unauthorized","message":"Unauthorized"}
      return <Navigate to={ROUTES.login} />
      // OR:
      // updateLocalStorage({ type: 'removeValue', key: 'auth' });
      // maybe too late because we already start rendering Chat
    }

    const errorMessageText= error?.status ?
      t('errors.dataLoadError') :
      t('errors.noNetwork');
    toast.error(errorMessageText, { autoClose: 8000 });
  }

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
              t('channelsList.toggleChannelsList.show')
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
