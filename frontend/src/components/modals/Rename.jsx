import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useModal, useScroll } from '../../hooks';
import { useChannelNameSchema } from '../../schemas/index';

import { renameCurrentChannel } from '../../socket/index';

const Rename = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const { setScrollPosition } = useScroll();
  const inputRef = useRef();

  const channels = useSelector((state) => state.channels.channelsData);
  const names = channels.map(({ name }) => name);
  const { name } = channels.find(({ id }) => id === modal.currentChannelId);

  const renameChannelSchema = useChannelNameSchema(names, t);

  const formik = useFormik({
    initialValues: { name },
    validationSchema: renameChannelSchema,
    onSubmit: (values) => {
      renameCurrentChannel(values.name, modal.currentChannelId);
      formik.resetForm();
      modal.hideModal();
      toast.success(t('toasts.channelRenamed'), {
        theme: 'dark',
        icon: <CheckCircleFill className="toastify-icon" />,
      });
      setScrollPosition('current');
    },
  });
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show onHide={() => modal.hideModal()}>
      <Modal.Header className="modal-header-theme" closeVariant="white" closeButton>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-theme">
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2 form-input"
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name" />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={() => modal.hideModal()} variant="secondary" type="button" className="me-2">{t('form.cancelBtn')}</Button>
              <Button variant="primary" type="submit">{t('chat.renameChannelBtn')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
