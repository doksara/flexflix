import React from 'react';
import './Show.scss';

const show = (props) => {
    return (
        <figure className="show">
            <img className="show__image" src={require(`../../assets/images/${props.image}`)} />
            <figcaption className="show__name">{props.title}</figcaption>
            <span className="show__station">{props.station}</span>
        </figure>
    );
}

export default show;