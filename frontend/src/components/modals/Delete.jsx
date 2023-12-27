import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useModal, useScroll } from '../../hooks';
import { deleteChannel } from '../../socket/index';

const Delete = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const { setScrollPosition } = useScroll();
  const focusedChannelId = useSelector((state) => state.channels.currentChannelId);

  const onClick = () => {
    // eslint-disable-next-line
    deleteChannel(modal.currentChannelId);
    // eslint-disable-next-line
    modal.hideModal();
    // eslint-disable-next-line
    toast.success(t('toasts.channelDeleted'));
    if (modal.currentChannelId === focusedChannelId) {
      // eslint-disable-next-line
      setScrollPosition('top');
    } else {
      // eslint-disable-next-line
      setScrollPosition('bottom');
    }
  };

  return (
    <Modal centered show onHide={() => modal.hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('questions.confirmChannelDeletion')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => modal.hideModal()} variant="secondary" type="button" className="me-2">{t('form.cancelBtn')}</Button>
          <Button onClick={onClick} variant="danger" type="submit">{t('form.deleteBtn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Delete;
