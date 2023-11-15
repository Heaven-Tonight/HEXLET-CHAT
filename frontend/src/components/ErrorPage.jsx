import {Button, Container, Card, CardBody} from 'react-bootstrap';

export const ErrorPage = () => (
  <Container fluid className="d-flex justify-content-center align-items-start min-vh-100 pt-5">
    <Card className="w-75">
      <CardBody className="row w-100 d-flex justify-content-center align-items-center">
          <Card.Text className="text-center h1"> ОШИБКА 404</Card.Text>
          <Card.Text className="text-center h3 pt-3"> К сожалению, страница не найдена :( </Card.Text>
          <Button href="/" variant="secondary" className="mt-5 col-5 col-md-5 mb-3"> Перейти на главную страницу </Button>
      </CardBody>
    </Card>
  </Container>
);

