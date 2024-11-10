import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import { addChannelName } from '../store/slices/ui.js';
import './Channel.css';

const Channel = ({ id, name, removable, isCurrent, handleChannelSelect }) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  /*
  const dispatch = useDispatch();
  dispatch(addChannelName(name));
  */

  // const currentChannel = useSelector((state) => state.ui.currentChannel);

  // const isChannelCurrent = Number(currentChannel.id) === Number(id);
  // console.log('isChannelCurrent', Number(currentChannel.id), Number(id));

  const dropDown =  (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className={cn("channel__toggle-btn", { "channel__toggle-btn--on": isDropdownMenuOpen})}
        bsPrefix={cn("channel__toggle-btn", { "channel__toggle-btn--on": isDropdownMenuOpen})}
      >
        Управление каналом
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          href="#/action-1"
          className="channel__dropdown-item"
        >
          Удалить
        </Dropdown.Item>
        <Dropdown.Item
          href="#/action-2"
          className="channel__dropdown-item"
        >
          Переименовать
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
          <span>#</span>&nbsp;{name}
        </button>
        {removable && dropDown}
      </div>
    </li>
  );
}

export default Channel;
