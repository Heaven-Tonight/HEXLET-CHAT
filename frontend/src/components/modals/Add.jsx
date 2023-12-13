import { Modal, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { toast } from 'react-toastify';
import { useModal } from '../../hooks/index.jsx';
import socket from '../../socket.js';
import filterProfanityWords from "../../dictionary/index.js";

const Add = () => {
  
  const { t } = useTranslation();
  const modal = useModal();
  
  const channels = useSelector((state) => state.channels.channelsData);
  const names = channels.map(({ name }) => name);
  
  setLocale({
    mixed: {
      notOneOf: () => t('errors.modalErrors.notOneOf'),
      required: () => t('errors.modalErrors.required'),
    },
    string: {
      min: () => t('errors.modalErrors.min'),
      max: () => t('errors.modalErrors.max'),
    },
  });
  
  const addChannelSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(20).notOneOf(names),
  });
  
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: addChannelSchema,
    onSubmit:  (values) => {
      socket.emit('newChannel',{ name: filterProfanityWords(values.name) });
      values.name = '';
      modal.hideModal();
      toast.success(t('toasts.channelCreated'));
    },
  });
  
  const inputRef = useRef();
  useEffect(() => {
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
            <label className="visually-hidden" htmlFor="name"></label>
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
