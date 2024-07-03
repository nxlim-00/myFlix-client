import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../main-view/movie-view';

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      image: 'https://m.media-amazon.com/images/I/51mQ60bthRL._AC_SY679_.jpg',
      director: 'Christopher Nolan',
    },
    {
      id: 2,
      title: 'The Godfather',
      image: 'https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg',
      director: 'Francis Ford Coppola',
    },
    {
      id: 3,
      title: 'Pulp Fiction',
      image: 'https://m.media-amazon.com/images/I/41VCB44VJAL._AC_.jpg',
      director: 'Quentin Tarantino',
    },
    {
      id: 4,
      title: 'The Shawshank Redemption',
      image: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg',
      director: 'Frank Darabont',
    },
    {
      id: 5,
      title: 'The Dark Knight',
      image: 'https://m.media-amazon.com/images/I/51EpZavHOhL._AC_SY679_.jpg',
      director: 'Christopher Nolan',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;
