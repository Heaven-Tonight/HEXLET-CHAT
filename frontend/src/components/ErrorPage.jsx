import {Button, Container, Card, CardBody} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="d-flex justify-content-center align-items-start pt-5">
      <Card className="w-75">
        <CardBody className="row w-100 d-flex justify-content-center align-items-center">
          <Card.Text className="text-center h1">{t('errors.routeErrors.404')}</Card.Text>
          <Card.Text className="text-center h3 pt-3">{t('errors.routeErrors.notFound')}</Card.Text>
          <Button href="/" variant="secondary" className="mt-5 col-5 col-md-5 mb-3">
            {t('nav.main')}
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};
