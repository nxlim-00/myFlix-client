import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user }) => {
  return (
    <Navbar
      collapseOnSelect
      expand={'lg'}
      sticky="top"
      bg="primary"
      data-bs-theme="dark"
      className="py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-auto">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-md-center"
          id="responsive-navbar-nav"
        >
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link
                  to="#"
                  onClick={() => {
                    localStorage.clear();
                    location.reload();
                    location.href = '/';
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {user && (
          <Navbar.Text className="ms-auto">
            Logged in as: <a href="#login">{user.Username}</a>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
};
