import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [movie] = useState(movies.find((mov) => mov._id == movieId));

  if (!movie) return <>Loading...</>;
  else
    return (
      <div>
        <div>
          <img className="w-30" src={movie.ImagePath} />
        </div>
        <div>
          <span>
            <strong>Title: </strong>
          </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>
            <strong>Description: </strong>
          </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>
            <strong>Genre: </strong>
          </span>
          <div>
            <span>
              <strong>Name: </strong>
            </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div>
            <span>
              <strong>Description: </strong>
            </span>
            <span>{movie.Genre.Description}</span>
          </div>
        </div>
        <div>
          <span>
            <strong>Director: </strong>
          </span>
          <div>
            <span>
              <strong>Name: </strong>
            </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span>
              <strong>Bio: </strong>
            </span>
            <span>{movie.Director.Bio}</span>
          </div>
          <div>
            <span>
              <strong>Birth: </strong>
            </span>
            <span>{movie.Director.Birth}</span>
          </div>
          <div>
            <span>
              <strong>Death: </strong>
            </span>
            <span>{movie.Director.Death}</span>
          </div>
        </div>
        <Link to={`/`}>
          <Button variant="primary">Back</Button>
        </Link>
      </div>
    );
};
