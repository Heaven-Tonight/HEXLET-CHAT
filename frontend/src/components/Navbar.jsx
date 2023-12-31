import { Container, Button, Navbar as NavbarComponent } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';

const Navbar = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();
  return (
    <NavbarComponent expand="lg" className="shadow-sm bg-white">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
        { loggedIn && <Button onClick={() => logOut()} variant="primary">{t('chat.logoutBtn')}</Button> }
      </Container>
    </NavbarComponent>
  );
};

export default Navbar;
