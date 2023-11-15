import { Formik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
  const { t } = useTranslation();
  return (
    <Formik>
      <Form className="col-7 col-md-7">
        <h1 className="text-center m-3">{t('form.signIn')}</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId={"formBasicEmail"} label={t('form.fields.nickname')}>
            <Form.Control type="text" autoComplete="username" required placeholder={t('form.fields.nickname')} name="username" value=""/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <FloatingLabel label={t('form.fields.password')} controlId={"formBasicPassword"}>
            <Form.Control type="password" placeholder={t('form.fields.password')}/>
          </FloatingLabel>
        </Form.Group>
        <Button variant="btn btn-outline-primary" className="col-6 col-md-12" type="submit">
          {t('form.signIn')}
        </Button>
      </Form>
    </Formik>
  );
};

