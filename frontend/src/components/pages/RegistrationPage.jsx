import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import RegistrationForm from '../forms/RegistrationForm.jsx';

const RegistrationPage = () => (
  <Container fluid className="h-100 pt-3">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} lg={6} xxl={4}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-3 p-md-5">
            <div className="mb-3 mb-md-0 align-items-center justify-content-center">
              <Card.Img
                className="rounded-circle"
                src="https://frontend-chat-ru.hexlet.app/static/media/avatar_1.6084447160acc893a24d.jpg"
                alt="User Avatar"
              />
            </div>
            <RegistrationForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default RegistrationPage;
