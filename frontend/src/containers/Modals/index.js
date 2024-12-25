import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.js';
import RemoveChannel from './RemoveChannel.js';
import RenameChannel from './RenameChannel.js';

const modals = {
  adding: AddChannel,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

const Modal = () => {
  const { modalType, channelId, channelName } = useSelector((state) => state.ui.modalInfo);

  const renderModal = () => {
    if (modalType === null) {
      return null;
    }

    const Component = modals[modalType];

    return <Component modalInfo={{ channelId, channelName }} />;
  };

  return renderModal();
};

export default Modal;
