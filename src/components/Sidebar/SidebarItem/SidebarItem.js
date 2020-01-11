import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarItem.scss';

// Icons
import DiscoverIcon from '../../../assets/icons/discover.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import LikeIcon from '../../../assets/icons/like.svg';
import StarIcon from '../../../assets/icons/star.svg';

const sidebarItem = (props) => {

    let icon = null;

    switch (props.icon) {
        case "discover":
            icon = DiscoverIcon; break;
        case "recommended":
            icon = LikeIcon; break;
        case "favorites":
            icon = StarIcon; break;
        case "like":
            icon = HeartIcon; break;
        default: break;
    }

    return (
        <div className="sidebar-item">
            <img src={icon} className="sidebar-item__icon" alt="sidebar icon" />
            <li className="sidebar-item__text">
                <NavLink
                    exact={props.exact}
                    activeClassName=""
                    to={props.link}>{props.children}
                </NavLink>
            </li>
        </div>
    )
}

export default sidebarItem;