import {
  Card, Container, Row, Col,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import LoginForm from '../forms/LoginForm.jsx';
import routes from '../../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-xxs-12 col-md-8 col-lg-5 col-sm-12 pt-0 col-xxl-8">
          <Card className="login-card shadow-sm">
            <Card.Body className="card-body row justify-content-center">
              <LoginForm />
            </Card.Body>
            <Card.Footer className="card-footer p-4">
              <div className="text-center">
                <span className="card-text">{t('footer.noAccount')}</span>
                <Card.Link className="card-link" href={routes.signup}>{t('form.signUp')}</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
