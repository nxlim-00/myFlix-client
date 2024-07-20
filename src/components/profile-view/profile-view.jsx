// profile-view.jsx
import { useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { UserInfo } from './user-info';
import './profile-view.scss';

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem('user'));

  const [username, setUsername] = useState(localUser.Username || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(localUser.Email || '');
  const [birthday, setBirthday] = useState(localUser.Birthday || '01/01/0001');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Update info successful.');
        window.location.reload();
      } else {
        alert('Update info failed.');
      }
    });
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={12} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <h1 className="profile-color">Profile</h1>
      </Col>
      <Col lg={6} md={12}>
        <UserInfo user={localUser} />
      </Col>
      <Col lg={6} md={12} className="profile-view">
        <Form onSubmit={handleSubmit}>
          <h4>Update user info:</h4>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="4"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBdate">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button style={{ marginTop: '20px' }} variant="primary" type="submit">
            Submit changes
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
