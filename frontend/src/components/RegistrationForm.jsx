import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSignUpSchema } from "../schemas/index.js";

export const RegistrationForm = () => {
    const { t } = useTranslation();
    const signUpSchema = useSignUpSchema();
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
    return (
      <Form onSubmit={formik.handleSubmit} className="col-7 col-md-7">
        <h1 className="text-center m-3">{t('form.signUp')}</h1>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <FloatingLabel controlId={"formBasicUsername"} label={t('form.fields.username')}>
            <Form.Control
              className={formik.errors.username && formik.touched.username ? 'is-invalid': ''}
              type="text"
              name="username"
              autoComplete="username"
              required
              placeholder={t('form.fields.username')}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            ) : null}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <FloatingLabel label={t('form.fields.password')} controlId={"formBasicPassword"}>
            <Form.Control
              className={formik.errors.password && formik.touched.password ? 'is-invalid': ''}
              required
              type="password"
              name="password"
              placeholder={t('form.fields.password')}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            ) : null}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
          <FloatingLabel controlId={"formBasicPasswordConfirmation"} label={t('form.fields.passwordConfirmation')}>
            <Form.Control
              className={formik.errors.username && formik.touched.username ? 'is-invalid': ''}
              type="password"
              name="passwordConfirmation"
              autoComplete="passwordConfirmation"
              required
              placeholder={t('form.fields.passwordConfirmation')}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.passwordConfirmation}
              </Form.Control.Feedback>
            ) : null}
          </FloatingLabel>
        </Form.Group>
        <Button variant="btn btn-outline-primary" className="col-6 col-md-12" type="submit">
          {t('form.signUpBtn')}
        </Button>
      </Form>
    );
  };
