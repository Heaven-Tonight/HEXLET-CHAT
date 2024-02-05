import {
  Button, Container, Col, Row,
} from 'react-bootstrap';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/index.jsx';

import ChannelsList from '../ChannelsList.jsx';
import MessagesList from '../MessagesList';

import { getInitialData } from '../../requests/index';
import { fetchChannels } from '../../store/slices/channelSlice';
import { fetchMessages } from '../../store/slices/messagesSlice';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modal = useModal();
  useEffect(() => {
    const fetchInitialData = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      try {
        const { data } = await getInitialData(token);
        dispatch(fetchChannels(data));
        dispatch(fetchMessages(data));
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    fetchInitialData();
  }, [dispatch]);

  const data = {
    channels: useSelector((state) => state.channels.channelsData),
    currentChannelId: useSelector((state) => state.channels.currentChannelId),
    messages: useSelector((state) => state.messages.messages),
  };

  return (
    <Container className="container chat-nav h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 flex-md-row">
        <div className="d-none d-lg-flex col-4 col-md-2 border-end px-0 flex-column h-100">
          <Col className="mt-1 d-flex justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('chat.channels')}</b>
            <Button
              onClick={() => modal.showModal('add')}
              type="button"
              variant="group-vertical"
              className="p-1 text-success"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M 14 1 a 1 1 0 0 1 1 1 v 12 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 V 2 a 1 1 0 0 1 1 -1 h 12 Z M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 H 2 Z" />
                <path d="M 8 4 a 0.5 0.5 0 0 1 0.5 0.5 v 3 h 3 a 0.5 0.5 0 0 1 0 1 h -3 v 3 a 0.5 0.5 0 0 1 -1 0 v -3 h -3 a 0.5 0.5 0 0 1 0 -1 h 3 v -3 A 0.5 0.5 0 0 1 8 4 Z" />
              </svg>
              <span className="visually-hidden">{t('chat.addChannelBtn')}</span>
            </Button>
          </Col>
          {data.channels.length > 0 && <ChannelsList data={data} />}
        </div>
        <MessagesList data={data} />
      </Row>
    </Container>
  );
};

export default ChatPage;
