import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view.jsx';
import { Row, Button, Col, Container, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [Signup, setSignup] = useState(false);

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
            director: movie.Director.Name,
          };
        });
        setMovies(movies); // if i use moviesFromApi the movies aren't shown
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                    {/*  <Button
                      variant="outline-primary"
                      onClick={() => <Navigate to="/login" />}
                    >
                      Back to Login
                    </Button> */}
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                    {/*   <Button
                      variant="outline-primary"
                      onClick={() => navigate('/signup')}
                    >
                      Login
                    </Button> */}
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col key={movies._id} md={8}>
                    <MovieView movies={movies} key={movies._id} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Button
                      className="d-flex justify-content-between align-items-center mb-4"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>

                    <Row>
                      {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={6} lg={3}>
                          <MovieCard key={movie._id} movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

{
  /* {user && (
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
          <Col>
        
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
          <Col style={{ border: '1px solid black' }}>
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
              <Col key={movie.id} md={6} lg={3}>
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
}; */
}
