import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { useAddChannelMutation, useGetChannelsQuery } from '../../store/apis/channelsApi.js';
import { hideModal, setCurrentChannel } from '../../store/slices/ui.js';

const AddChannel = () => {
  const { t } = useTranslation();

  const [addChannel, { isLoading: isAddChannelLoading }] = useAddChannelMutation();
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
      .min(3, t('channelsList.modals.validationErrors.channelNameLength'))
      .max(20, t('channelsList.modals.validationErrors.channelNameLength'))
      .required(t('channelsList.modals.validationErrors.required'))
      .notOneOf(channelNames, t('channelsList.modals.validationErrors.unique')),
  });

  // const notify = () => toast.success("Wow so easy !");
  const handleAddChannel = async (values) => {
    try {
      const resp = await addChannel({ name: values.name });
      toast.success(t('toasts.addChannelSuccess'), { autoClose: 8000 });
      const { id, name } = resp.data;
      dispatch(setCurrentChannel({ id, name }));
    } catch (e) {
      toast.error(t('toasts.addChannelError'), { autoClose: 8000 });
    }
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: VALIDATION_SCHEMA,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      handleAddChannel(values);
      dispatch(hideModal());
      resetForm();
    },
  });

  return (
    <Modal show className="modal" onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channelsList.modals.addChannel.headline')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form__input-box">
            <input
              className="form__input"
              required
              type="text"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              id="channel-name-field"
            />
            <label className="visually-hidden" htmlFor="channel-name-field">
              {t('channelsList.modals.addChannel.label')}
            </label>
            <p
              className={formik.errors.name && formik.touched.name ? 'form__err-message' : 'offscreen'}
              aria-live="assertive"
            >
              <span>{formik.errors.name}</span>
            </p>
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="bttn modal__btn"
              onClick={() => dispatch(hideModal())}
            >
              {t('channelsList.modals.buttons.cancel')}
            </button>
            <button
              className="bttn modal__btn modal__btn--submit"
              disabled={isAddChannelLoading}
              type="submit"
            >
              {t('channelsList.modals.buttons.submit')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
