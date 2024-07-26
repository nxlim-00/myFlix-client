import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FavoriteMovies } from './favorite-movies';

export const FavoriteMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    fetch('https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
        setFavMovies(
          movies.filter((movie) => localUser.FavoriteMovies.includes(movie._id))
        );
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const updateFavMovies = (movieId) => {
    setFavMovies((prevFavMovies) =>
      prevFavMovies.filter((m) => m._id !== movieId)
    );
  };

  return (
    <Container style={{ height: '100vh' }}>
      <div>
        <FavoriteMovies
          favoriteMovieList={favMovies}
          updateFavMovies={updateFavMovies}
        />
      </div>
    </Container>
  );
};
