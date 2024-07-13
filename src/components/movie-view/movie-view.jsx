export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <div>
          <span>Name: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Genre.Description}</span>
        </div>
      </div>
      <div>
        <span>Director: </span>
        <div>
          <span>Name: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          {' '}
          <span>Bio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div>
          {' '}
          <span>Birth: </span>
          <span>{movie.Director.Birth}</span>
        </div>
        <div>
          {' '}
          <span>Death: </span>
          <span>{movie.Director.Death}</span>
        </div>
      </div>

      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
