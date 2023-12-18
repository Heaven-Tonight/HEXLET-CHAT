import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from '../../routes.js';
import { fetchChannels } from '../../store/slices/channelSlice.js';
import { fetchMessages } from '../../store/slices/messagesSlice.js';
import ChannelsList from '../ChannelsList.jsx';
import { useModal } from '../../hooks/index.jsx';
import MessagesList from '../MessagesList';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modal = useModal();
  // eslint-disable-next-line
  useEffect(() => {
    const fetchInitialData = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      // eslint-disable-next-line
      try {
        const { data } = await axios.get(routes.server.data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // eslint-disable-next-line
        dispatch(fetchChannels(data));
        // eslint-disable-next-line
        dispatch(fetchMessages(data));
      } catch (e) {
        throw e;
      }
    };
    // eslint-disable-next-line
    fetchInitialData();
  }, [dispatch]);

  const data = {
    channels: useSelector((state) => state.channels.channelsData),
    currentChannelId: useSelector((state) => state.channels.currentChannelId),
    messages: useSelector((state) => state.messages.messages),
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('chat.channels')}</b>
            <Button
              onClick={() => modal.showModal('add')}
              type="button"
              variant="group-vertical"
              className="p-1 text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M 14 1 a 1 1 0 0 1 1 1 v 12 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 V 2 a 1 1 0 0 1 1 -1 h 12 Z M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 H 2 Z" />
                <path d="M 8 4 a 0.5 0.5 0 0 1 0.5 0.5 v 3 h 3 a 0.5 0.5 0 0 1 0 1 h -3 v 3 a 0.5 0.5 0 0 1 -1 0 v -3 h -3 a 0.5 0.5 0 0 1 0 -1 h 3 v -3 A 0.5 0.5 0 0 1 8 4 Z" />
              </svg>
              <span className="visually-hidden">{t('chat.addChannelBtn')}</span>
            </Button>
          </div>
          {data.channels.length > 0 && <ChannelsList data={data} />}
        </div>
        <MessagesList data={data} />
      </div>
    </div>
  );
};

export default ChatPage;
