import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useModal } from '../../hooks';
import { renameCurrentChannel } from '../../socket/index';
import { useChannelNameSchema } from '../../schemas/index';

const Rename = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const inputRef = useRef();

  const channels = useSelector((state) => state.channels.channelsData);
  const names = channels.map(({ name }) => name);
  const { name } = channels.find(({ id }) => id === modal.currentChannelId);
  // eslint-disable-next-line
  const renameChannelSchema = useChannelNameSchema(names, t);

  const formik = useFormik({
    initialValues: { name },
    validationSchema: renameChannelSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line
      renameCurrentChannel(values.name, modal.currentChannelId);
      // eslint-disable-next-line
      values.name = '';
      // eslint-disable-next-line
      modal.hideModal();
      // eslint-disable-next-line
      toast.success(t('toasts.channelRenamed'));
    },
  });
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    inputRef.current.select();
  }, []);

  return (
    <Modal centered show onHide={() => modal.hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
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
