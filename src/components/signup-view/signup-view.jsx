import { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();

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
        alert('Signup successful. Please log in.');
        navigate('/login');
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="SignUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            placeholder="Enter a username."
          />
        </Form.Group>

        <Form.Group controlId="SignPassword">
          <Form.Label style={{ paddingTop: '10px' }}>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter a password."
          />
        </Form.Group>
        <Form.Group controlId="SignMail">
          <Form.Label style={{ paddingTop: '10px' }}>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter a valid email."
          />
        </Form.Group>

        <Form.Group controlId="SignBirthday">
          <Form.Label style={{ paddingTop: '10px' }}>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button style={{ marginTop: '20px' }} type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
