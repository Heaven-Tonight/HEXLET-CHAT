import { Button, ListGroup } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleChannel } from '../store/slices/channelSlice.js';
import { useModal, useScroll } from '../hooks/index.jsx';
/* eslint-disable */
const ChannelsList = ({ data }) => {
  const { channels, currentChannelId } = data;
  const [isOpenDropdown, setIsOpenDropdown] = useState({});
  const dropdownRefs = useRef({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modal = useModal();
  const { shouldScrollToBottom } = useScroll();

  const channelsBoxRef = useRef();

  const toggleDropdown = (id) => {
    setIsOpenDropdown((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const onToggleChannel = (id) => (event) => {
    event.stopPropagation();
    if (isOpenDropdown) {
      setIsOpenDropdown({});
    }
    dispatch(toggleChannel({ currentChannelId: id }));
  };

  const handleClickOutside = (event) => {
    Object.keys(isOpenDropdown).forEach((id) => {
      if (dropdownRefs.current[id] && !dropdownRefs.current[id].contains(event.target)) {
        setIsOpenDropdown((prevState) => ({ ...prevState, [id]: false }));
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpenDropdown({});
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenDropdown]);
  useEffect(() => {
    if (shouldScrollToBottom) {
      channelsBoxRef.current.scrollTop = channelsBoxRef.current.scrollHeight;
    }
  }, [channels, shouldScrollToBottom]);

  return (
    <ListGroup ref={channelsBoxRef} id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      { channels && channels.map(({ name, id, removable }) => {
        const variant = (currentChannelId === id) ? 'secondary' : null;
        if (removable) {
          return (
            <li key={id} className="nav-item w-100">
              <div
                ref={(el) => (dropdownRefs.current[id] = el)}
                onClick={() => toggleDropdown(id)}
                role="group"
                className={isOpenDropdown[id] ? 'd-flex show dropdown btn-group' : 'd-flex dropdown btn-group'}
              >
                <Button
                  onClick={onToggleChannel(id)}
                  variant={variant}
                  type="button"
                  className="w-100 rounded text-start"
                >
                  <span className="me-1">{t('chat.switchChannelBtn')}</span>
                  {name}
                </Button>
                <Button
                  variant={variant}
                  type="button"
                  id="react-aria4233204493-1"
                  aria-expanded={isOpenDropdown[id]}
                  className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
                >
                  <span className="visually-hidden">Управление каналом</span>
                </Button>
                <div
                  className={isOpenDropdown[id] ? 'dropdown-menu show' : 'dropdown-menu'}
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    transform: 'translate3d(5.01493px, 39.403px, 0px)',
                  }}
                  x-placement="bottom-start"
                  aria-labelledby="react-aria4233204493-1"
                  data-popper-reference-hidden="true"
                  data-popper-escaped="true"
                  data-popper-placement="top-start"
                >
                  <a
                    onClick={() => modal.showModal('delete', id)}
                    className="dropdown-item"
                    role="button"
                    tabIndex="0"
                    href="#"
                  >
                    {t('chat.deleteChannelBtn')}
                  </a>
                  <a
                    onClick={() => modal.showModal('rename', id)}
                    className="dropdown-item"
                    role="button"
                    tabIndex="0"
                    href="#"
                  >
                    {t('chat.renameChannelBtn')}
                  </a>
                </div>
              </div>
            </li>
          );
        }
        return (
          <li key={id} className="nav-item w-100">
            <Button
              onClick={onToggleChannel(id)}
              variant={variant}
              type="button"
              className="w-100 rounded text-start"
            >
              <span className="me-1">{t('chat.switchChannelBtn')}</span>
              {name}
            </Button>
          </li>
        );
      }) }
    </ListGroup>
  );
};

export default ChannelsList;
