import { ListGroup, Button } from 'react-bootstrap';
import { toggleChannel } from '../store/slices/channelSlice.js';


export default (data, t, dispatch) => {
  const { currentChannelId, channels } = data;
  
  const onToggle = (id) => (e) => {
    dispatch(toggleChannel({ currentChannelId: id}));
  };
  
  return (
    <ListGroup id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      { channels && channels.map(({ name, id }) => {
        return (
          <li key={id} className="nav-item w-100">
            <Button
              onClick={onToggle(id)}
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
