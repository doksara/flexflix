import React from 'react';
import './Show.scss';

const show = (props) => {
    return (
        <figure class="show">
            <img class="show__image" src={require(`../../assets/images/${props.image}`)} />
            <figcaption class="show__name">{props.title}</figcaption>
            <span class="show__station">{props.station}</span>
        </figure>
    );
}

export default show;