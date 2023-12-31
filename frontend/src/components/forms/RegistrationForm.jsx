import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../routes.js';
import { useAuth } from '../../hooks/index.jsx';
import { sendRegistrationData } from '../../requests';
import { useRegistrationFormSchema } from '../../schemas/index';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  // eslint-disable-next-line
    useEffect(() => {
    // eslint-disable-next-line
    inputRef.current.focus();
  }, [inputRef]);

  const registrationSchema = useRegistrationFormSchema(t);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: registrationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      // eslint-disable-next-line
      setRegistrationFailed(false);
      // eslint-disable-next-line
      try {
        const { username, password } = values;
        // eslint-disable-next-line
        const { data } = await sendRegistrationData({ username, password });
        // eslint-disable-next-line
        localStorage.setItem('user', JSON.stringify(data));
        // eslint-disable-next-line
        auth.logIn();
        // eslint-disable-next-line
        const { from } = location.state || { from: { pathname: routes.root } };
        // eslint-disable-next-line
        navigate(from);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          // eslint-disable-next-line
          setRegistrationFailed(true);
          // eslint-disable-next-line
          inputRef.current.select();
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-100 pt-0 p-5">
      <h1 className="text-center mb-4">{t('form.signUp')}</h1>
      <FloatingLabel className="mb-3" controlId="username" label={t('form.fields.username')}>
        <Form.Control
          ref={inputRef}
          type="text"
          name="username"
          autoComplete="username"
          placeholder={t('form.fields.username')}
          required
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          isInvalid={(formik.errors.username && formik.touched.username) || registrationFailed}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel className="mb-3" label={t('form.fields.password')} controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder={t('form.fields.password')}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={(formik.errors.password && formik.touched.password) || registrationFailed}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel className="mb-4" controlId="passwordConfirmation" label={t('form.fields.passwordConfirmation')}>
        <Form.Control
          type="password"
          name="passwordConfirmation"
          autoComplete="passwordConfirmation"
          placeholder={t('form.fields.passwordConfirmation')}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={
            /* eslint-disable-next-line */
            (formik.errors.passwordConfirmation && formik.touched.passwordConfirmation) || registrationFailed
          }
        />
        {registrationFailed && <div className="invalid-tooltip">{t('errors.registrationErrors.registrationFailed')}</div>}
        <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="btn btn-outline-primary" type="submit" className="w-100">
        {t('form.signUpBtn')}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
