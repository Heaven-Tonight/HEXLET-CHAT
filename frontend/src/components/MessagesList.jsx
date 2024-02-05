import { Col } from 'react-bootstrap';

import { useEffect, useRef } from 'react';
import { useScroll } from '../hooks';

import ChatMessagesForm from './forms/ChatMessagesForm.jsx';
import MessagesHeader from './MessagesHeader';

const MessagesList = ({ data }) => {
  const { currentChannelId, messages } = data;
  const { scrollToBottom } = useScroll();
  const messagesBoxRef = useRef();

  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  useEffect(() => {
    scrollToBottom(messagesBoxRef);
  }, [currentChannelMessages, scrollToBottom]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex messages-container flex-column h-100">
        <MessagesHeader data={data} />
        <div ref={messagesBoxRef} id="messages-box" className="scroll-area overflow-auto px-5">
          { currentChannelMessages.map(({ body, id, username }) => (
            <div key={id} className="text-break mb-2">
              <b className="username">{username}</b>
              {': '}
              {body}
            </div>
          )) }
        </div>
        <div className="mt-auto px-5 py-3 messages-form-container">
          <ChatMessagesForm />
        </div>
      </div>
    </Col>
  );
};

export default MessagesList;
