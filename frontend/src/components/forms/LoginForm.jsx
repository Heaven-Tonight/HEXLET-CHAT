import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import routes from '../../routes.js';
import { useAuth } from '../../hooks/index.jsx';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    inputRef.current.focus();
  }, [inputRef]);

  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      // eslint-disable-next-line
      setAuthFailed(false);
      // eslint-disable-next-line
      try {
        // eslint-disable-next-line
        const { data } = await axios.post(routes.server.login, values);
        // eslint-disable-next-line
        localStorage.setItem('user', JSON.stringify(data));
        // eslint-disable-next-line
        auth.logIn();
        // eslint-disable-next-line
        const { from } = location.state || { from: { pathname: routes.root } };
        // eslint-disable-next-line
        navigate(from);
      } catch (error) {
        // eslint-disable-next-line
        setSubmitting(false);
        if (error instanceof AxiosError && error.response.status === 401) {
          // eslint-disable-next-line
          setAuthFailed(true);
          // eslint-disable-next-line
          inputRef.current.select();
          return;
        }
        throw (error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('form.signIn')}</h1>
      <FloatingLabel className="mb-3" controlId="email" label={t('form.fields.nickname')}>
        <Form.Control
          ref={inputRef}
          type="text"
          name="username"
          autoComplete="username"
          placeholder={t('form.fields.username')}
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={authFailed}
        />
      </FloatingLabel>
      <FloatingLabel className="mb-4" label={t('form.fields.password')} controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder={t('form.fields.password')}
          required
          onChange={formik.handleChange}
          isInvalid={authFailed}
        />
        <Form.Control.Feedback type="invalid">{t('errors.loginFailed')}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="btn btn-outline-primary" type="submit" className="w-100 mb-3">
        {t('form.signIn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
