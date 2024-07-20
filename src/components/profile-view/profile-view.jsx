import { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form, Card } from 'react-bootstrap';
import { UserInfo } from './user-info';
import './profile-view.scss';

export const ProfileView = () => {
  // Get the stored user and token from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  // Initialize user state with storedUser if available
  const [user, setUser] = useState(storedUser ? storedUser : null);

  // Initialize formData state with storedUser's details if available
  const [formData, setFormData] = useState({
    Username: storedUser ? storedUser.Username : '',
    Password: '',
    Email: storedUser ? storedUser.Email : '',
  });

  // Initialize token state with storedToken if available
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // Fetch user data if user state is not already set
  useEffect(() => {
    if (!user) {
      fetch(
        `https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/${storedUser.Username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Set user state with fetched data
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [user, token, storedUser.Username]);

  // Handle form field updates
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to update user information
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...user,
      ...formData,
    };

    fetch(
      `https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser); // Update user state with the updated user data
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage with the updated user data
        alert('User information updated successfully!');
      })
      .catch((error) =>
        console.error('Error updating user information:', error)
      );
  };

  // Handle user deregistration
  const handleDeregister = () => {
    fetch(
      `https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/${user.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Account deleted successfully.');
          localStorage.clear(); // Clear localStorage
          window.location.reload(); // Reload the page to reset the state
        } else {
          throw new Error('Failed to deregister user');
        }
      })
      .catch((error) => {
        console.error('Error deregistering user:', error);
      });
  };

  return (
    <Container>
      {user && ( // Render the user information and form only if user is set
        <Row>
          <Col lg={6} md={12}>
            <Card>
              <Card.Body>
                <UserInfo user={storedUser} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={12}>
            <Card>
              <Card.Body>
                <form className="profile-form h-100" onSubmit={handleSubmit}>
                  <h4>Update your profile:</h4>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      value={formData.Username}
                      onChange={(e) => handleUpdate(e)}
                      required
                      minLength="5"
                      placeholder="Username must be at least 5 characters."
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      onChange={(e) => handleUpdate(e)}
                      required
                      minLength="5"
                      placeholder="Password must be at least 5 characters."
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={(e) => handleUpdate(e)}
                      required
                      placeholder="Enter a valid email address."
                    />
                  </Form.Group>
                  <Button
                    className="back-button"
                    style={{ cursor: 'pointer', marginTop: '10px' }}
                    variant="primary"
                    type="submit"
                  >
                    Submit change
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Button
        className="back-button"
        style={{ cursor: 'pointer' }}
        onClick={handleDeregister}
      >
        Deregister
      </Button>
    </Container>
  );
};
