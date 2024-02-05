import {
  Button,
  Modal,
} from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useModal, useScroll } from '../../hooks';

import { deleteChannel } from '../../socket/index';

const Delete = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const { setScrollPosition } = useScroll();
  const focusedChannelId = useSelector((state) => state.channels.currentChannelId);

  const onClick = () => {
    deleteChannel(modal.currentChannelId);
    modal.hideModal();
    toast.success(t('toasts.channelDeleted'), {
      theme: 'dark',
      icon: <CheckCircleFill className="toastify-icon" />,
    });
    if (modal.currentChannelId === focusedChannelId) {
      setScrollPosition('top');
    } else {
      setScrollPosition('bottom');
    }
  };

  return (
    <Modal show onHide={() => modal.hideModal()}>
      <Modal.Header className="modal-header-theme" closeVariant="white" closeButton>
        <Modal.Title>{t('chat.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-theme">
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
