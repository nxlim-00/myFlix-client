import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, updateAction }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const movieId = movie._id; // Correctly set movieId

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movieId)) {
      setIsFavorite(true);
    }
  }, [movieId]);

  const handleAddToFav = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized');
        throw new Error('Failed to add movie to favorites');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsFavorite(true);
      updateAction(movieId);
      alert('Movie added to your favorite list successfully!');
    } catch (error) {
      console.log(
        `An error occurred while adding the movie to favorites: ${error.message}`
      );
    }
  };

  const handleRemoveFromFav = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized');
        throw new Error('Failed to remove movie from favorites');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsFavorite(false);
      updateAction(movieId);
      alert('Movie removed from your favorite list successfully!');
    } catch (error) {
      console.log(
        `An error occurred while removing the movie from favorites: ${error.message}`
      );
    }
  };

  return (
    <Card className="h-100" style={{ marginTop: '10px' }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="primary">Open</Button>
        </Link>
        <div className="mt-auto">
          {isFavorite ? (
            <Button
              className="btn btn-warning"
              onClick={() => handleRemoveFromFav(movie._id)}
            >
              Remove from favorites
            </Button>
          ) : (
            <Button
              className="btn btn-success"
              onClick={() => handleAddToFav(movie._id)}
            >
              Add to favorites
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  updateAction: PropTypes.func.isRequired,
};
