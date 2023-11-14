import { Container, Navbar as NavbarComponent } from 'react-bootstrap';

export const Navbar = () => (
    <NavbarComponent className="shadow-sm">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
      </Container>
    </NavbarComponent>
);

