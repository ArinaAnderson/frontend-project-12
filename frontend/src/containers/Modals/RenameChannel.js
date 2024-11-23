import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { useEditChannelMutation, useGetChannelsQuery } from '../../store/apis/channelsApi.js';
import { hideModal } from '../../store/slices/ui.js';

const RenameChannel = ({ modalInfo }) => {
  const { t } = useTranslation();

  const { channelId, channelName } = modalInfo;

  const [ editChannel, { error, isLoading: isEditChannelLoading } ] = useEditChannelMutation();
  const { data } = useGetChannelsQuery();
  const channelNames = data.length ? data.map((el) => el.name) : [];

  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, 'Channel name must be at least 3 characters long')
      .max(20, 'Channel name can\'t be longer than 20 characters')
      .required('required')
      .notOneOf(channelNames, 'Such name already exists')
  });

  const handleRenameChannel = (values) => {
    editChannel({ name: values.name, channelId });
  };

  const formik = useFormik({
    initialValues: { name: channelName },
    validationSchema: VALIDATION_SCHEMA,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      handleRenameChannel(values);
      dispatch(hideModal());
      resetForm();
    },
  });

  return (
    <Modal show className="modal" onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              className="form__input"
              required
              type="text"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              id="channel-name-field"
            />
            <label className="visually-hidden" htmlFor="channel-name-field">
              Имя канала
            </label>
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="bttn modal__btn"
              onClick={() => dispatch(hideModal())}
            >
              Отменить
            </button>
            <button
              className="bttn modal__btn modal__btn--submit"
              disabled={isEditChannelLoading}
              type="submit"
            >
              Отправить
            </button>
          </div>
          
          
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
