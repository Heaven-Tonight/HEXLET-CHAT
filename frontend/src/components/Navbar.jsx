import { Container, Navbar as NavbarComponent } from 'react-bootstrap';

const Navbar = () => (
    <NavbarComponent expand="lg" className="shadow-sm bg-white">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
      </Container>
    </NavbarComponent>
);

export default Navbar;
