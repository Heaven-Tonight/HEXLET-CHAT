import { Container, Navbar as NavbarComponent } from 'react-bootstrap';

const Navbar = () => (
    <NavbarComponent className="shadow-sm">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
      </Container>
    </NavbarComponent>
);

export default Navbar;
