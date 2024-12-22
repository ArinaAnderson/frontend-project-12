import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import Dropdown from 'react-bootstrap/Dropdown';
import { setModalInfo } from '../store/slices/ui.js';
import './Channel.css';

const Channel = (
  {
    id, name, removable, isCurrent, handleChannelSelect,
  },
) => {
  const { t } = useTranslation();

  const testClassName = ' w-100, rounded-0 text-start text-truncate btn';
  // const originalClassName = 'channel__select-btn';

  const dispatch = useDispatch();

  const handleRenameChannelBtnClick = () => {
    dispatch(setModalInfo({ channelId: id, channelName: name, modalType: 'renaming' }));
  };

  const handleRemoveChannelBtnClick = () => {
    dispatch(setModalInfo({ channelId: id, modalType: 'removing' }));
  };

  const dropDown = (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className={cn('channel__toggle-btn')}
        bsPrefix={cn('channel__toggle-btn')}
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
    <li className={cn('channel', { 'channel--current': isCurrent })}>
      <div
        className="channel__box"
      >
        <button
          type="button"
          className={cn(testClassName, { 'btn-secondary': isCurrent })}
          onClick={() => handleChannelSelect(id, name)}
          disabled={isCurrent}
        >
          <span>#</span>
          &nbsp;
          {filter.clean(name)}
        </button>
        {removable && dropDown}
      </div>
    </li>
  );
};

export default Channel;
