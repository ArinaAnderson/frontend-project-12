import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation } from '../store/apis/messagesApi.js';
import { useFormik } from 'formik';

import Skeleton from '../components/Skeleton.js';

const ChannelWindow = ({ channelName, channelId }) => {
  const { data, error, isLoading: isGetMessagesLoading } = useGetMessagesQuery();
  const currentChannelMessages = data ?
    data.filter((message) => message.channelId === channelId) :
    [];

  const [ addMessage, { isLoading: isAddMessageLoading } ] = useAddMessageMutation();

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

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const handleAddMessage = (values) => {
    const message = { channelId, username, body: values['message-input'] };
    addMessage(message);
  };
  const formik = useFormik({
    initialValues: {
      'message-input': '',
    },
    onSubmit: (values, { resetForm }) => {
      handleAddMessage(values);
      resetForm();
    },
  });

  return (
    <div className="channel-window">
      <div className="channel-window__header">
        <b>#&nbsp;{channelName}</b>
        <span>{data?.length ? data.length : 0} сообщений</span>
      </div>
      {content}
      <form className="channel-window__form" onSubmit={formik.handleSubmit}>
        <div className="channel-window__form-control">
          <label className="visually-hidden" htmlFor="message-input">Введите сообщение</label>
          <input
            type="text"
            placeholder="Введите сообщение"
            onChange={formik.handleChange}
            value={formik.values['message-input']}
            name="message-input"
            id="message-input"
            ref={inputRef}
            required
          />
          <button
            disabled={isAddMessageLoading}
            type="submit"
            className="channel-window__form-submit-btn"
          >
            Отправить
          </button>
        </div>
      </form>
      
    </div>
  );
}

export default ChannelWindow;


