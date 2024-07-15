import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view.jsx';
import { Row, Button, Col, Container } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [Signup, setSignup] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch('https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            genre: movie.Genre.Name,
            directior: movie.Director.Name,
          };
        });
        setMovies(movies); // if i use moviesFromApi the movies aren't shown
      });
  }, [token]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        {user && (
          <Row>
            <Col className="text-right">
              <button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </button>
            </Col>
          </Row>
        )}

        {!user ? (
          <Col xs={12} s={6} md={4} lg={3}>
            {/* Separate and connect LoginView and SignupView */}
            {!Signup ? (
              <>
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
                <Button
                  variant="outline-primary"
                  onClick={() => setSignup(true)}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <SignupView />
                <Button
                  variant="outline-primary"
                  onClick={() => setSignup(false)}
                >
                  Back to Login
                </Button>
              </>
            )}
          </Col>
        ) : selectedMovie ? (
          <Col
            xs={12}
            s={6}
            md={4}
            lg={3}
            style={{ border: '1px solid black' }}
          >
            <MovieView
              style={{ border: '1px solid green' }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col key={movie.id} xs={12} s={6} md={4} lg={3}>
                <MovieCard
                  className="mb-5"
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};
