import React, {useContext} from 'react';
import Heart from '../../assets/icons/heart.svg';
import HeartActive from '../../assets/icons/heart_active.svg';
import {RootStoreContext} from "../../store/rootStore";
import { withRouter, NavLink } from "react-router-dom";
import './Show.scss';

const Show = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { likeShow } = rootStore.showStore;
    const icon = (props.isLiked) ? HeartActive : Heart;
    const isHidden = props.isLiked == null;

    return (
        <figure className="show">
            <NavLink to={`/show/${props.id}`}>
                <img className="show__image" alt='show-poser' src={require(`../../assets/images/${props.image}`)} />
            </NavLink>
            <figcaption className="show__name">{props.title}</figcaption>
            <span className="show__station">{props.station}</span>
            {!isHidden &&
                <img className="show__like" onClick={() => likeShow(props.id)} alt='like-icon' src={icon}/> }
        </figure>
    );
};

export default withRouter(Show);