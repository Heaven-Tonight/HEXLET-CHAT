import  { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io('http://localhost:3000');

const ChatMessagesForm = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const { username } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
      socket.on('newMessage', (payload) => console.log(payload));
  }, []);


  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = { body: message, channelId, username };
    socket.emit('newMessage', data);
    setMessage('');
  };

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Form onSubmit={onSubmitHandler} noValidate className="py-1 border rounded-2" id="message-form">
      <Form.Group controlId="message" className="input-group has-validation">
        <Form.Control
          onChange={onChangeHandler}
          className="border-0 p-0 ps-2"
          name="body"
          aria-label={t('form.messages.newMessage')}
          placeholder={t('form.messages.enterMessage')}
          value={message}
        />
        <Button disabled={!message} variant="group-vertical" type="submit" className="border-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
          </svg>
          <span className="visually-hidden">{t('form.sendBtn')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ChatMessagesForm;
