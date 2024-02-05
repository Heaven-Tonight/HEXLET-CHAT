import { Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SideChannelsMenu from './SideMenu';

const MessagesHeader = ({ data }) => {
  const { channels, currentChannelId, messages } = data;
  const { t } = useTranslation();

  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const messagesCount = currentChannelMessages.length;

  const [isShownSideMenu, setIsShownSideMenu] = useState(false);

  const onHideSideMenu = () => {
    setIsShownSideMenu(false);
  };

  return (
    <div className="mb-4 chat-nav p-3 shadow-sm small d-flex justify-content-between">
      <div>
        <p className="m-0">
          <b>
            {channels.length > 0 && currentChannel.name && `# ${currentChannel.name}`}
          </b>
        </p>
        <span className="messages-counter">{t('form.messages.messagesCount.count', { count: messagesCount })}</span>
      </div>
      <Button className="d-lg-none" variant="nofill-body" onClick={() => setIsShownSideMenu(!isShownSideMenu)}>
        <List color="white" />
      </Button>
      <SideChannelsMenu show={isShownSideMenu} onHideSideMenu={onHideSideMenu} />
    </div>
  );
};

export default MessagesHeader;
