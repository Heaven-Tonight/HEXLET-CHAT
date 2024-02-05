import { Button, Offcanvas } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useModal } from '../hooks';

import ChannelsList from './ChannelsList';

const SideChannelsMenu = ({ show, onHideSideMenu }) => {
  const { t } = useTranslation();
  const modal = useModal();
  const data = {
    channels: useSelector((state) => state.channels.channelsData),
    currentChannelId: useSelector((state) => state.channels.currentChannelId),
    messages: useSelector((state) => state.messages.messages),
  };

  return (
    <Offcanvas show={show} onHide={onHideSideMenu} placement="end">
      <Offcanvas.Header closeVariant="white" closeButton>
        <Offcanvas.Title>
          {t('chat.channels')}
          <Button
            onClick={() => modal.showModal('add')}
            type="button"
            variant="group-vertical"
          >
            <PlusSquare color="white" />
          </Button>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="offcanvas-body scroll-area">
        {data.channels.length > 0 && (
        <ChannelsList data={data} show={show} onHideSideMenu={onHideSideMenu} />
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideChannelsMenu;
