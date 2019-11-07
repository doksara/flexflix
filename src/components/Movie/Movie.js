import React from 'react';

import classes from './Movie.css';

const movie = (props) => {

    let imageStyle = {
        backgroundImage: 'url( ' + props.image + ')',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 0%"
    }

    return (
        <div style={imageStyle} className={classes.Movie}>
            <p>{props.name}</p>
        </div>
    );
};

export default movie;