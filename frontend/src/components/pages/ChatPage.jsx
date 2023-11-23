import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import  ChatMessagesForm from '../forms/ChatMessagesForm.jsx';
import routes from '../../routes.js';
import { initialFetch } from "../../store/slices/channelSlice.js";

const ChatPage = () => {
  const channels = useSelector((state) => state.channels.channelsData);
  const dispatch = useDispatch();

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
      } catch(e) {
        throw e;
      }
    };
    requestData();
  }, []);
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M 14 1 a 1 1 0 0 1 1 1 v 12 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 V 2 a 1 1 0 0 1 1 -1 h 12 Z M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 H 2 Z"></path>
                    <path d="M 8 4 a 0.5 0.5 0 0 1 0.5 0.5 v 3 h 3 a 0.5 0.5 0 0 1 0 1 h -3 v 3 a 0.5 0.5 0 0 1 -1 0 v -3 h -3 a 0.5 0.5 0 0 1 0 -1 h 3 v -3 A 0.5 0.5 0 0 1 8 4 Z"></path>
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
               {/*ЗДЕСЬ СПИСОК КАНАЛОВ*/}
              <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"></ul>
            </div>
            <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b># general</b>
                    </p>
                    <span className="text-muted"> 0 сообщений</span>
                  </div>
                  <div id="message-box" className="chat-messages overflow-auto p-5"></div>
                  <div className="mt-auto px-5 py-3">
                    <ChatMessagesForm />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  );
};

export default ChatPage;
