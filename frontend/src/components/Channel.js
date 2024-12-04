import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import Dropdown from 'react-bootstrap/Dropdown';
import { setModalInfo, setModalType, addChannelName } from '../store/slices/ui.js';
import './Channel.css';

/*  
  function App(){
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
*/
const Channel = ({ id, name, removable, isCurrent, handleChannelSelect }) => {
  const { t } = useTranslation();

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const dispatch = useDispatch();

  /*
  dispatch(addChannelName(name));
  */

  // const currentChannel = useSelector((state) => state.ui.currentChannel);

  // const isChannelCurrent = Number(currentChannel.id) === Number(id);
  // console.log('isChannelCurrent', Number(currentChannel.id), Number(id));

  const handleRenameChannelBtnClick = () => {
    dispatch(setModalInfo({ channelId: id, channelName: name, modalType: 'renaming'}));
  };

  const handleRemoveChannelBtnClick = () => {
    dispatch(setModalInfo({ channelId: id, modalType: 'removing'}));
  };

  const dropDown =  (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className={cn("channel__toggle-btn", { "channel__toggle-btn--on": isDropdownMenuOpen})}
        bsPrefix={cn("channel__toggle-btn", { "channel__toggle-btn--on": isDropdownMenuOpen})}
      >
        {t('channelsList.channelDropDown.toggle')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          role="button"
          href="#"
          className="channel__dropdown-item"
          onClick={() => handleRemoveChannelBtnClick()}
        >
          {t('channelsList.channelDropDown.remove')}
        </Dropdown.Item>
        <Dropdown.Item
          role="button"
          href="#"
          className="channel__dropdown-item"
          onClick={() => handleRenameChannelBtnClick()}
        >
          {t('channelsList.channelDropDown.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <li className={cn("channel", { "channel--current": isCurrent})}>
      <div
        className="channel__box"
      >
        <button
          type="button"
          className="channel__select-btn"
          onClick={() => handleChannelSelect(id, name)}
          disabled={isCurrent}
        >
          <span>#</span>&nbsp;{filter.clean(name)}
        </button>
        {removable && dropDown}
      </div>
    </li>
  );
}

export default Channel;
