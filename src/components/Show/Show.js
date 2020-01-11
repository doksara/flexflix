import React from 'react';
import './Show.scss';
import Heart from '../../assets/icons/heart.svg';
import HeartActive from '../../assets/icons/heart_active.svg';

const show = (props) => {

    let icon = (props.liked) ? HeartActive : Heart;

    return (
        <figure className="show">
            <img className="show__image" src={require(`../../assets/images/${props.image}`)} />
            <figcaption className="show__name">{props.title}</figcaption>
            <span className="show__station">{props.station}</span>
            <img className="show__like" onClick={props.likeClick} src={icon} />
        </figure>
    );
}

export default show;