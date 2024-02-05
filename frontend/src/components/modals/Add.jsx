import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useModal, useScroll } from '../../hooks/index.jsx';

import { addNewChannel } from '../../socket/index.js';
import { useChannelNameSchema } from '../../schemas';

const Add = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const { setScrollPosition } = useScroll();

  const channels = useSelector((state) => state.channels.channelsData);
  const names = channels.map(({ name }) => name);

  const addChannelSchema = useChannelNameSchema(names, t);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: addChannelSchema,
    onSubmit: (values) => {
      addNewChannel(values.name);
      formik.resetForm();
      modal.hideModal();
      toast.success(t('toasts.channelCreated'), {
        theme: 'dark',
        icon: <CheckCircleFill className="toastify-icon" />,
      });
      setScrollPosition('bottom');
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal className="modal-centered-lg" show onHide={() => modal.hideModal()}>
      <Modal.Header className="modal-header-theme" closeVariant="white" closeButton>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
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
            <Form.Label className="visually-hidden" htmlFor="name">{t('chat.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-4">
              <Button onClick={() => modal.hideModal()} variant="secondary" type="button" className="me-2">{t('form.cancelBtn')}</Button>
              <Button variant="btn" className="btn-green" type="submit">{t('form.sendBtn')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
