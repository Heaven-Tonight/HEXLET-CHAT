import {Col, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import  ChatMessagesForm from '../forms/ChatMessagesForm.jsx';
import routes from '../../routes.js';
import { initialFetch } from '../../store/slices/channelSlice.js';
import renderChannelsList from '../../renders/renderChannelsList.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const requestData = async() => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      try {
        const { data } = await axios.get(routes.server.data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(initialFetch(data));
        return;
      } catch(e) {
        throw e;
      }
    };
    requestData();
  }, []);
  
  return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('chat.channels')}</b>
                <Button type="button" variant="group-vertical" className="p-0 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M 14 1 a 1 1 0 0 1 1 1 v 12 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 V 2 a 1 1 0 0 1 1 -1 h 12 Z M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 H 2 Z"></path>
                    <path d="M 8 4 a 0.5 0.5 0 0 1 0.5 0.5 v 3 h 3 a 0.5 0.5 0 0 1 0 1 h -3 v 3 a 0.5 0.5 0 0 1 -1 0 v -3 h -3 a 0.5 0.5 0 0 1 0 -1 h 3 v -3 A 0.5 0.5 0 0 1 8 4 Z"></path>
                  </svg>
                  <span className="visually-hidden">{t('chat.addChannelBtn')}</span>
                </Button>
              </div>
              {renderChannelsList()}
            </div>
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b># general</b>
                  </p>
                  {/*счетчик сообщений*/}
                  <span className="text-muted"> 0 сообщений</span>
                </div>
                {/*здесь сообщения чата в зависимости от текущего канала*/}
                <div id="messages-box" className="chat-messages overflow-auto px-5"></div>
                <div className="mt-auto px-5 py-3">
                  <ChatMessagesForm />
                </div>
              </div>
            </Col>
          </div>
        </div>
  );
};

export default ChatPage;
