import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, updateAction }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const movieId = `${movie._id}`;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (
      user &&
      user.FavoriteMovies &&
      user.FavoriteMovies.includes(movie._id)
    ) {
      setIsFavorite(true);
    }
  }, [movie._id]);

  const handleAddToFav = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      if (!token) return;
      const response = await fetch(
        `https://myflix12-47ea37fcfdd6.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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
      alert('Movie added to your favorite list successfully!');
    } catch (error) {
      alert('An error occurred while adding the movie to favorites.');
    }
  };

  const handleRemoveFromFav = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `https://myflix12-47ea37fcfdd6.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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
      updateAction(movieId); // Ensure the action updates the state
      alert('Movie removed from your favorite list successfully!');
    } catch (error) {
      console.error('Error removing favorite movie:', error.message);
      alert('An error occurred while removing the movie from favorites.');
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
              Remove
            </Button>
          ) : (
            <Button
              className="btn btn-success"
              onClick={() => handleAddToFav(movie._id)}
            >
              Add
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
