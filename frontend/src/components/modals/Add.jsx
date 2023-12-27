import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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
      // eslint-disable-next-line
      addNewChannel(values.name);
      // eslint-disable-next-line
      values.name = '';
      // eslint-disable-next-line
      modal.hideModal();
      // eslint-disable-next-line
      toast.success(t('toasts.channelCreated'));
      // eslint-disable-next-line
      setScrollPosition('bottom');
    },
  });

  const inputRef = useRef();
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show onHide={() => modal.hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={() => modal.hideModal()} variant="secondary" type="button" className="me-2">{t('form.cancelBtn')}</Button>
              <Button variant="primary" type="submit">{t('form.sendBtn')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
