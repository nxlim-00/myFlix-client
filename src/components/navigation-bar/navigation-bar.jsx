import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
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
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-md-end"
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
                <NavDropdown
                  title="Profile"
                  bg="primary"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile" href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/favorites"
                    href="#action/3.2"
                  >
                    My Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    to="#"
                    onClick={() => {
                      localStorage.clear();
                      location.reload();
                      location.href = '/';
                    }}
                    href="#action/3.3"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

                {/*  <Nav.Link as={Link} to="/profile">
                  Profile
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
                </Nav.Link> */}
              </>
            )}
          </Nav>
          {user && (
            <Navbar.Text className="ms-auto justify-content-end">
              Logged in as: <a href="profile">{user.Username}</a>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
