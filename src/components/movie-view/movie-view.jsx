import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [movie] = useState(movies.find((mov) => mov._id == movieId));

  if (!movie) return <>Loading...</>;

  return (
    <Row
      className="mt-4"
      style={{ border: '1px solid black', padding: '10px' }}
    >
      <Col lg={6} md={12} className="mb-3">
        <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
      </Col>
      <Col lg={6} md={12}>
        <div className="mb-3">
          <span>
            <strong>Title: </strong>
          </span>
          <span>{movie.Title}</span>
        </div>
        <div className="mb-3">
          <span>
            <strong>Description: </strong>
          </span>
          <span>{movie.Description}</span>
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
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
          {movie.Director.Death && (
            <div>
              <span>
                <strong>Death: </strong>
              </span>
              <span>{movie.Director.Death}</span>
            </div>
          )}
        </div>
        <Link to={`/`}>
          <Button style={{ marginTop: '20px' }} variant="primary">
            Back
          </Button>
        </Link>
      </Col>
    </Row>
  );
};
