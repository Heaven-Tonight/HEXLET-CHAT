import { Col } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ChatMessagesForm from '../components/forms/ChatMessagesForm.jsx';

const MessagesList = (props) => {
  const { t } = useTranslation();
  const { channels, currentChannelId, messages } = props.data;
  const messagesBoxRef = useRef();
  
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);
  const messagesCount = currentChannelMessages.length;
  
  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  }, [currentChannelMessages]);
  
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {channels.length > 0 && currentChannel.name}</b>
          </p>
          <span className="text-muted">{t('form.messages.messagesCount.count', { count: messagesCount })}</span>
        </div>
        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5">
          { currentChannelMessages.map(({ body, id, username }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              {': '}
              {body}
            </div>
          )) }
        </div>
        <div className="mt-auto px-5 py-3">
          <ChatMessagesForm />
        </div>
      </div>
    </Col>
  );
};

export default MessagesList;

