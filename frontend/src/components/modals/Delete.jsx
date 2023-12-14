import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {toast} from 'react-toastify';
import { useModal } from '../../hooks';
import socket from '../../socket';
import routes from '../../routes.js';

const Delete = () => {
  const { t } = useTranslation();
  const modal = useModal();
  
  const onClick = () => {
    socket.emit(routes.server.socket.removeChannel, { id: modal.currentChannelId });
    modal.hideModal();
    toast.success(t('toasts.channelDeleted'));
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
