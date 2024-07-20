import React, { useState, useEffect } from 'react';
import { FavoriteMovies } from './favorite-movies';

export const FavoriteMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    fetch('https://myflix12-47ea37fcfdd6.herokuapp.com/movies', {
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
    <div>
      <FavoriteMovies
        favoriteMovieList={favMovies}
        updateFavMovies={updateFavMovies}
      />
    </div>
  );
};
