import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from "axios";
import routes from '../routes.js';
import AuthContext from '../contexts/AuthProvider.jsx';

export const LoginForm = () => {
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  },[inputRef]);

  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.server.login, values);
        localStorage.setItem('user', JSON.stringify(data));
        setAuth(true);
        const { from } = location.state || { from: { pathname: routes.root } };
        navigate(from);
      }catch(error) {
        setSubmitting(false);
        if (error instanceof  AxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw(error);
      }
    },
  });
  return (
      <Form onSubmit={formik.handleSubmit} className="col-7 col-md-7">
        <h1 className="text-center m-3">{t('form.signIn')}</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId={"formBasicEmail"} label={t('form.fields.nickname')}>
            <Form.Control
              ref={inputRef}
              type="text"
              name="username"
              autoComplete="username"
              required
              placeholder={t('form.fields.username')}
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={authFailed}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <FloatingLabel label={t('form.fields.password')} controlId={"formBasicPassword"}>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder={t('form.fields.password')}
              onChange={formik.handleChange}
              isInvalid={authFailed}
            />
            <Form.Control.Feedback type="invalid">{t('errors.loginFailed')}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Button variant="btn btn-outline-primary" className="col-6 col-md-12" type="submit">
          {t('form.signIn')}
        </Button>
      </Form>
  );
};

