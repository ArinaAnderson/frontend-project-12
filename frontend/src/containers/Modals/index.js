import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import AddChannel from './AddChannel.js';
// import RemoveChannel from './RemoveChannel.jsx';
// import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  // removing: RemoveChannel,
  // renaming: RenameChannel,
};

const Modal = () => {
  const modalType = useSelector((state) => state.ui.modalType);

  const renderModal = () => {
    if (modalType === null) {
      return null;
    }

    const Component = modals[modalType];

    return <Component />
  };

  return renderModal();
};

export default Modal;
