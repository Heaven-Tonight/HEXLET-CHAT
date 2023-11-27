import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default () => {
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channels.channelsData);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

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

