import { ListGroup, Button } from 'react-bootstrap';

export default (data, t) => {
  const { currentChannelId, channels } = data;
  
  return (
    <ListGroup id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      { channels && channels.map(({ name, id }) => {
        return (
          <li key={id} className="nav-item w-100">
            <Button
              variant={(currentChannelId === id) ? 'secondary' : null}
              type="button"
              className="w-100 rounded text-start">
              <span className="me-1">{t('chat.switchChannelBtn')}</span>
              {name}
            </Button>
          </li>
        );
      }) }
    </ListGroup>
  );
};
