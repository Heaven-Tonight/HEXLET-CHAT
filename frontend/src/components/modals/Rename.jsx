import {useModal} from "../../hooks";
import {useSelector} from "react-redux";
import {setLocale} from "yup";
import * as Yup from "yup";
import {useFormik} from "formik";
import socket from "../../socket.js";
import {useEffect, useRef} from "react";
import {Button, Form, FormControl, FormGroup, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const Rename = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const inputRef = useRef();
  
  const channels = useSelector((state) => state.channels.channelsData);
  const names = channels.map(({ name }) => name);
  const { name } = channels.find(({ id }) => id === modal.currentChannelId);
  
  
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
  
  const renameChannelSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(20).notOneOf(names),
  });
  
  const formik = useFormik({
    initialValues: { name },
    validationSchema: renameChannelSchema,
    onSubmit:  (values) => {
      socket.emit('renameChannel', { id: modal.currentChannelId, name: values.name });
      values.name = '';
      modal.hideModal();
    },
  });
  
  useEffect(() => {
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
            <label className="visually-hidden" htmlFor="name"></label>
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

