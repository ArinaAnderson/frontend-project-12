import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { useRemoveChannelMutation } from '../../store/apis/channelsApi.js';
// import { useGetMessagesQuery } from '../../store/apis/messagesApi.js';
import apiSlice from '../../store/api.js';
import { hideModal } from '../../store/slices/ui.js';

const RemoveChannel = ({ modalInfo }) => {
  const { t } = useTranslation();

  const { channelId } = modalInfo;

  const [removeChannel, { isLoading: isRemoveChannelLoading }] = useRemoveChannelMutation();
  // const [removeMessage] = useRemoveMessageMutation();

  // const { data: allMessages } = useGetMessagesQuery();
  // const { refetch: refetchMessages } = useGetMessagesQuery();

  // const currentChannelMessages = allMessages
  // ? allMessages.filter((message) => message.channelId === channelId)
  // : [];

  const dispatch = useDispatch();

  const handleRemoveChannel = async () => {
    try {
      await removeChannel({ channelId });
      // refetchMessages(); --> RTK: Cannot refetch a query that has not been started yet
      dispatch(apiSlice.util.invalidateTags([{ type: 'Message' }]));

      toast.success(t('toasts.removeChannelSuccess'), { autoClose: 8000 });
    } catch (e) {
      console.log('REFETCHING ERROR', e);
      toast.error(t('toasts.removeChannelError'), { autoClose: 8000 });
    }
  };

  const formik = useFormik({
    initialValues: { },
    onSubmit: () => {
      handleRemoveChannel();
      dispatch(hideModal());
    },
  });

  return (
    <Modal show className="modal" onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channelsList.modals.removeChannel.headline')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <p className="lead">{t('channelsList.modals.removeChannel.text')}</p>
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
              className="bttn btn-danger modal__btn modal__btn--submit"
              disabled={isRemoveChannelLoading}
              type="submit"
            >
              {t('channelsList.modals.removeChannel.submit')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
