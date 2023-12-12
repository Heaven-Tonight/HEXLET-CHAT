import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../../routes.js';
import { useAuth } from '../../hooks/index.jsx';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
    
    useEffect(() => {
      inputRef.current.focus();
      },[inputRef]);
    
    Yup.setLocale({
      mixed: {
        oneOf: () => t('errors.registrationErrors.oneOf'),
        required: () => t('errors.required'),
      },
      string: {
        min: () => t('errors.registrationErrors.min'),
        max: () => t('errors.registrationErrors.max'),
      },
    })
    
    const registrationSchema = Yup.object().shape({
      username: Yup.string().required().min(3).max(20),
      password: Yup.string().required().min(6, t('errors.registrationErrors.password.min')),
      passwordConfirmation: Yup.string().required(t('errors.registrationErrors.oneOf')).oneOf([Yup.ref('password')]),
    });
  
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: registrationSchema,
      validateOnBlur: true,
      onSubmit: async (values) => {
        setRegistrationFailed(false);
        try {
          const { username, password } = values;
          const { data } = await axios.post(routes.server.signup, { username, password });
          localStorage.setItem('user', JSON.stringify(data));
          auth.logIn();
          const { from } = location.state || { from: { pathname: routes.root } };
          navigate(from);
        } catch(error) {
          if (error.isAxiosError && error.response.status === 409) {
            setRegistrationFailed(true);
            inputRef.current.select();
            return;
          }
        }
      },
    });
    
    return (
      <Form onSubmit={formik.handleSubmit} className="w-100 pt-0 p-5">
        <h1 className="text-center mb-4">{t('form.signUp')}</h1>
          <FloatingLabel className="mb-3" controlId={"username"} label={t('form.fields.username')}>
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
              isInvalid={formik.errors.username && formik.touched.username || registrationFailed}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mb-3" label={t('form.fields.password')} controlId={"password"}>
            <Form.Control
              type="password"
              name="password"
              placeholder={t('form.fields.password')}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.password && formik.touched.password || registrationFailed}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mb-4" controlId={"passwordConfirmation"} label={t('form.fields.passwordConfirmation')}>
            <Form.Control
              type="password"
              name="passwordConfirmation"
              autoComplete="passwordConfirmation"
              placeholder={t('form.fields.passwordConfirmation')}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.passwordConfirmation && formik.touched.passwordConfirmation || registrationFailed}
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
