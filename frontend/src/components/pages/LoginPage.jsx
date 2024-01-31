import { Card, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from '../forms/LoginForm.jsx';
import routes from '../../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-xxs-4 col-md-8 col-lg-5 col-sm-4 pt-0 col-xxl-12">
          <Card className="shadow-sm">
            <Card.Body className="card-body row justify-content-center">
              <LoginForm />
            </Card.Body>
            <Card.Footer className="card-footer p-4">
              <div className="text-center">
                <span>{t('footer.noAccount')}</span>
                <Card.Link href={routes.signup}>{t('form.signUp')}</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default LoginPage;
