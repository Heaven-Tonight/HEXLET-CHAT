import { Formik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export const LoginForm = () => (
  <Formik>
    <Form className="col-6 col-md-6">
      <h1 className="text-center m-5"> Войти </h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel controlId={"formBasicEmail"} label="Ваш ник">
          <Form.Control type="text" autoComplete="username" required placeholder="Ваш ник"  name="username" value=""  />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <FloatingLabel label="Пароль" controlId={"formBasicPassword"}>
          <Form.Control type="password" placeholder="Пароль" />
        </FloatingLabel>
      </Form.Group>
      <Button variant="btn btn-outline-primary" className="col-6 col-md-12" type="submit">
        Войти
      </Button>
    </Form>
  </Formik>
);

