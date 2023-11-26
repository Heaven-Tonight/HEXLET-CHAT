import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSignUpSchema } from "../../schemas";

const RegistrationForm = () => {
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
        // console.log(values);
      },
    });
    return (
      <Form onSubmit={formik.handleSubmit} className="w-100 pt-0 p-5">
        <h1 className="text-center mb-4">{t('form.signUp')}</h1>
          <FloatingLabel className="mb-3" controlId={"username"} label={t('form.fields.username')}>
            <Form.Control
              type="text"
              name="username"
              autoComplete="username"
              placeholder={t('form.fields.username')}
              required
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-3" label={t('form.fields.password')} controlId={"password"}>
            <Form.Control
              type="password"
              name="password"
              placeholder={t('form.fields.password')}
              required
              onChange={formik.handleChange}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-4" controlId={"passwordConfirmation"} label={t('form.fields.passwordConfirmation')}>
            <Form.Control
              type="password"
              name="passwordConfirmation"
              autoComplete="passwordConfirmation"
              placeholder={t('form.fields.passwordConfirmation')}
              required
              onChange={formik.handleChange}
            />
          </FloatingLabel>
        <Button variant="btn btn-outline-primary" type="submit" className="w-100">
          {t('form.signUpBtn')}
        </Button>
      </Form>
    );
};

export default RegistrationForm;
