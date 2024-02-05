import { Button, ListGroup, Dropdown } from 'react-bootstrap';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useModal, useScroll } from '../hooks/index.jsx';

import { toggleChannel } from '../store/slices/channelSlice.js';

const ChannelsList = ({ data, show, onHideSideMenu }) => {
  const { channels, currentChannelId } = data;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelsBoxRef = useRef();
  const modal = useModal();
  const {
    scrollState,
    scrollToBottom,
    scrollToTop,
  } = useScroll();

  const { shouldScrollToTop, shouldScrollToBottom } = scrollState;

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const onToggleChannel = (id) => () => {
    if (show) {
      onHideSideMenu();
    }
    dispatch(toggleChannel({ currentChannelId: id }));
  };

  const handleClickOutside = useCallback(() => {
    if (isOpenDropdown) {
      setIsOpenDropdown(false);
    }
  }, [isOpenDropdown]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom(channelsBoxRef);
    }
    if (shouldScrollToTop) {
      scrollToTop(channelsBoxRef);
    }
  }, [
    channels,
    shouldScrollToBottom,
    shouldScrollToTop,
    scrollToBottom,
    scrollToTop,
  ]);

  return (
    <ul ref={channelsBoxRef} id="channels-box" className="scroll-area nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels && channels.map(({ name, id, removable }) => {
        const variant = currentChannelId === id ? 'secondary' : null;

        if (removable) {
          return (
            <ListGroup.Item key={id} className="nav-item w-100">
              <Dropdown
                onClick={toggleDropdown}
                role="group"
                className={isOpenDropdown ? 'd-flex show dropdown btn-group' : 'd-flex dropdown btn-group'}
              >
                <Button
                  onClick={onToggleChannel(id)}
                  variant={variant}
                  type="button"
                  className="switch-channel-button w-100 rounded-0 text-start text-truncate"
                >
                  <span className="me-1">{t('chat.switchChannelBtn')}</span>
                  {name}
                </Button>
                <Dropdown.Toggle
                  variant={variant}
                  type="button"
                  id={`dropdown-toggle-${id}`}
                  aria-expanded={isOpenDropdown}
                  className="channel-dropdown-button flex-grow-0 dropdown-toggle dropdown-toggle-split"
                >
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  show={isOpenDropdown}
                  aria-labelledby={`dropdown-toggle-${id}`}
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    top: '39.403px',
                    left: '5.01493px',
                  }}
                  x-placement="bottom-start"
                  className="channel-dropdown"
                >
                  <Dropdown.Item className="channel-dropdown-item" onClick={() => modal.showModal('delete', id)}>
                    {t('chat.deleteChannelBtn')}
                  </Dropdown.Item>
                  <Dropdown.Item className="channel-dropdown-item" onClick={() => modal.showModal('rename', id)}>
                    {t('chat.renameChannelBtn')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          );
        }

        return (
          <ListGroup.Item key={id} className="nav-item w-100">
            <Button
              onClick={onToggleChannel(id)}
              variant={variant}
              type="button"
              className="switch-channel-button w-100 rounded text-start"
            >
              <span className="me-1">{t('chat.switchChannelBtn')}</span>
              {name}
            </Button>
          </ListGroup.Item>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
