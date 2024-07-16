import Button from 'react-bootstrap/Button';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img class="mw-100" src={movie.ImagePath} />
      </div>
      <div>
        <span>
          <strong>Title: </strong>
        </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>
          <strong>Description: </strong>{' '}
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

      <Button onClick={onBackClick}>Back</Button>
    </div>
  );
};
