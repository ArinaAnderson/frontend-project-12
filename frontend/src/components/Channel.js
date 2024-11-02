import React, { useState } from 'react';
import cn from 'classnames';

const Channel = ({ id, name, removable, isCurrent, handleChannelSelect }) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  console.log('START DROPDOWN', isDropdownMenuOpen);

  const dropdownMenu = (
    <div className={cn("channel__dropdown", { "channel__dropdown--open": isDropdownMenuOpen })}>
      <a className="channel__dropdown-item" role="button" href="#">Удалить</a>
      <a className="channel__dropdown-item" role="button" href="#">Переименовать</a>
    </div>
  );

  const handleDropdowmmenuToggle = (val) => {
    // setIsDropdownMenuOpen(!isDropdownMenuOpen);
    setIsDropdownMenuOpen(val);
  };

  return (
    <li className={cn("channel", { "channel--current": isCurrent})}>
      <div className="channel__box">
        <button
          type="button"
          className="channel__select-btn"
          onClick={() => handleChannelSelect(id, name)}
          disabled={isCurrent}
        >
          <span>#</span>&nbsp;{name}
        </button>

        {removable && <button
          type="button"
          className={cn("channel__toggle-btn", { "channel__toggle-btn--on": isDropdownMenuOpen})}
          onClick={() => handleDropdowmmenuToggle(!isDropdownMenuOpen)}
          onBlur={() => {
            console.log('BLUR!!!', isDropdownMenuOpen);
            handleDropdowmmenuToggle(false);
          }}
        >
          Управление каналом
        </button>
        }
        {isDropdownMenuOpen && dropdownMenu}
      </div>
    </li>
  );
}

export default Channel;
