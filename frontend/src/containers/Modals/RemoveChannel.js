import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import { useRemoveChannelMutation } from '../../store/apis/channelsApi.js';
import { useRemoveMessageMutation, useGetMessagesQuery } from '../../store/apis/messagesApi.js';
import { hideModal, setCurrentChannel } from '../../store/slices/ui.js';

const RemoveChannel = ({ modalInfo }) => {
  const { channelId } = modalInfo;
  // const { currentChannel } = useSelector((state) => state.ui);

  const [ removeChannel, { isLoading: isRemoveChannelLoading } ] = useRemoveChannelMutation();
  const [ removeMessage, { isLoading: isRemoveMessageLoading } ] = useRemoveMessageMutation();

  const { data, error, isLoading: isGetMessagesLoading } = useGetMessagesQuery();

  const currentChannelMessages = data ?
    data.filter((message) => message.channelId === channelId) :
    [];

  // const deleteMessageRequests = currentChannelMessages.map((el) => removeMessage(el.id));

  const dispatch = useDispatch();

  const handleRemoveChannel = async () => {
    try {
      await removeChannel({ channelId });
      /*
      if (currentChannel.id === channelId) {
        console.log('IS CURRENT CHANNEL', currentChannel.id,channelId, currentChannel.id === channelId);
        dispatch(setCurrentChannel());
      }
      */
      const deleteMessageRequests = currentChannelMessages.map((el) => removeMessage(el.id));
      const promise = Promise.all(deleteMessageRequests);
      // currentChannelMessages.forEach((el) => removeMessage(el.id));
    } catch(e) {
      console.log('ERROR', e.message);
      // toast
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
    <Modal show className="modal">
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <p className="lead">Уверены?</p>
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
              disabled={isRemoveChannelLoading}
              type="submit"
            >
             Удалить
            </button>
          </div>
          
          
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
