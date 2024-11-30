import React from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../store/apis/messagesApi.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Skeleton from '../components/Skeleton.js';

const ChannelMessages = ({ channelName, channelId }) => {
  const { t } = useTranslation();

  const { data: allMessages, error, isLoading: isGetMessagesLoading } = useGetMessagesQuery();

  if (error) {
    toast.error(t('errors.dataLoadError'), { autoClose: 8000 });
  }

  const currentChannelMessages = allMessages ?
    allMessages.filter((message) => message.channelId === channelId) :
    [];

  const username = useSelector((state) => state.auth.username);

  const content = isGetMessagesLoading ?
    <Skeleton times={5} className='skeleton--w-90'/> :
    <div className="channel-window__messages">
      {currentChannelMessages.map(({ id, body, username }) => (
        <div key={id} className="channel-window__message">
          <b>{`${username}: ${body}`}</b>
        </div>
      ))}
    </div>;

  return (
    <>
      <div className="channel-window__header">
        <b>#&nbsp;{channelName}</b>
        <span>
          {
            t(
              'channelWindow.messagesCount.count',
              { count: currentChannelMessages?.length ? currentChannelMessages.length : 0}
            )
          }
        </span>
      </div>
      {content}
    </>
    
  );
}

export default ChannelMessages;
