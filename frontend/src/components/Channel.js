import React, { useState } from 'react';
import cn from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import './Channel.css';

const Channel = ({ id, name, removable, isCurrent, handleChannelSelect }) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  console.log('START DROPDOWN', isDropdownMenuOpen);

  const dropdownMenuOld = (
    <div
      className={cn("channel__dropdown", { "channel__dropdown--open": isDropdownMenuOpen })}
      onBlur={() => {
        console.log('DROPDOWN BLUR!!!', isDropdownMenuOpen);
        handleDropdowmmenuToggle(false);
      }}
    >
      <a
        className="channel__dropdown-item"
        role="button" href="#"
      >
        Удалить
      </a>
      <a
        onBlur={(evt) => {
          // evt.stopPropagation();
          // handleDropdowmmenuToggle(true);
        }}
        className="channel__dropdown-item"
        role="button" href="#"
      >
        Переименовать
      </a>
    </div>
  );
  
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

  const handleDropdowmmenuToggle = (val) => {
    // setIsDropdownMenuOpen(!isDropdownMenuOpen);
    setIsDropdownMenuOpen(val);
  };

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

// {isDropdownMenuOpen && dropdownMenu}

/*

        {removable && <button
          type="button"
          className={cn("channel__toggle-btn", { "channel__toggle-btn--on": isDropdownMenuOpen})}
        >
          Управление каналом
        </button>
        }
        // {isDropdownMenuOpen && dropdownMenuOld}
*/
