import React from 'react';
import classes from './Movie.css';

interface IMovieProps {
  image: string;
  name: string;
}

const Movie: React.FC<IMovieProps> = props => {
  let imageStyle = {
    backgroundImage: 'url( ' + props.image + ')',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 0%'
  };

  return (
    <div style={imageStyle} className={classes.Movie}>
      <p>{}</p>
    </div>
  );
};

export default Movie;
