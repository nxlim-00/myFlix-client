import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onSearch, onLoggedOut }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      bg="primary"
      data-bs-theme="dark"
      className="py-3 w-100"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>

        {/* Search bar on small screens */}
        {user && (
          <Form className="d-lg-none d-flex align-items-center ms-auto">
            <Form.Control
              type="search"
              placeholder="Search movie"
              className="me-2 custom-search"
              aria-label="Search"
              onChange={handleSearchChange}
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        )}

        {/* Burger menu on small screens */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="d-lg-none ms-auto"
        />

        <Navbar.Collapse id="responsive-navbar-nav">
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
                <Nav.Link as={Link} to="/profile" className="d-lg-none">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/favorites" className="d-lg-none">
                  My Favorites
                </Nav.Link>
                <Nav.Link
                  style={{ color: '#FF0000', marginTop: '30px' }}
                  className="d-lg-none d-flex align-items-center"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                    window.location.href = '/';
                  }}
                >
                  <strong>Logout</strong>
                </Nav.Link>
                <NavDropdown
                  title="Profile"
                  bg="primary"
                  id="basic-nav-dropdown"
                  className="d-none d-lg-block"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/favorites">
                    My Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>

          {/* Search bar only visible on large screens */}
          {user && (
            <Form className="d-none d-lg-flex mx-auto align-items-center">
              <Form.Control
                type="search"
                placeholder="Search movie"
                className="me-2 custom-search"
                aria-label="Search"
                onChange={handleSearchChange}
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          )}

          {/* "Logged in as" text */}
          {user && (
            <Navbar.Text className="d-none d-lg-block ms-auto">
              Logged in as:{' '}
              <Button variant="outline-light" href="profile">
                {user.Username}
              </Button>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
