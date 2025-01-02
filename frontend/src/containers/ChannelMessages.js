import React from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useGetMessagesQuery } from '../store/apis/messagesApi.js';
import Skeleton from '../components/Skeleton.js';

const ChannelMessages = ({ channelName, channelId }) => {
  const { t } = useTranslation();

  const { data: allMessages, error, isLoading: isGetMessagesLoading } = useGetMessagesQuery();

  console.log('ALL MESSAGES', allMessages);

  if (error) {
    const errorMessageText = error?.status
      ? t('errors.dataLoadError')
      : t('errors.noNetwork');
    toast.error(errorMessageText, { autoClose: 8000 });
  }

  const currentChannelMessages = allMessages
    ? allMessages.filter((message) => message.channelId === channelId)
    : [];

  const content = isGetMessagesLoading
    ? <Skeleton times={5} className="skeleton--w-90" />
    : (
      <div className="channel-window__messages">
        {currentChannelMessages.map(({ id, body, username }) => (
          <div key={id} className="channel-window__message">
            <b>{`${username}: ${filter.clean(body)}`}</b>
          </div>
        ))}
      </div>
    );

  return (
    <div className="channel-window__wrap">
      <div className="channel-window__header">
        <b>
          #&nbsp;
          {filter.clean(channelName)}
        </b>
        <span>
          {
            t(
              'channelWindow.messagesCount.count',
              { count: currentChannelMessages?.length ? currentChannelMessages.length : 0 },
            )
          }
        </span>
      </div>
      {content}
    </div>
  );
};

export default ChannelMessages;
