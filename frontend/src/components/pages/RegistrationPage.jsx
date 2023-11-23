import { Card, Col, Container, Row } from 'react-bootstrap';
import RegistrationForm from '../forms/RegistrationForm.jsx';

const RegistrationPage = () => {
  return (
    <Container fluid className="h-100 w-75">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6 pt-5">
          <Card className="shadow-sm">
            <Card.Body className="row p-3">
              <Col className="col-5 col-md-5 p-5 d-flex justify-content-center align-items-center">
                <Card.Img
                  className="rounded-circle"
                  src="https://frontend-chat-ru.hexlet.app/static/media/avatar_1.6084447160acc893a24d.jpg"/>
              </Col>
              <RegistrationForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;

