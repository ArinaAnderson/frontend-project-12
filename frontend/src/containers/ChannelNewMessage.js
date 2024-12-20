import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAddMessageMutation } from '../store/apis/messagesApi.js';

const ChannelNewMessage = ({ channelId }) => {
  const { t } = useTranslation();

  const [addMessage, { isLoading: isAddMessageLoading }] = useAddMessageMutation();

  const username = useSelector((state) => state.auth.username);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [channelId]);

  const handleAddMessage = async (values) => {
    const message = { channelId, username, body: values['message-input'] };
    try {
      await addMessage(message);
    } catch (e) {
      toast.error(t('errors.dataSendError'));
    }
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
    <form className="channel-window__form" onSubmit={formik.handleSubmit}>
      <div className="channel-window__form-control">
        <label className="visually-hidden" htmlFor="message-input">{t('form.newMessage.label')}</label>
        <input
          type="text"
          aria-label={t('form.newMessage.ariaLabel')}
          placeholder={t('form.newMessage.placeholder')}
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
          {t('form.newMessage.submit')}
        </button>
      </div>
    </form>
  );
};

export default ChannelNewMessage;
