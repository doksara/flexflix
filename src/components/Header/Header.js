import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from "../../store/rootStore";

import './Header.scss';

const Header = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { logout } = rootStore.userStore;

    return (
        <header>
            <div className="navigation-container">
                <nav>
                    <ul>
                        <li><NavLink activeClassName="" to="/discover">Home</NavLink></li>
                        <li><NavLink activeClassName="" to="/about">About</NavLink></li>
                        <li><NavLink activeClassName="" to="https://github.com/doksara/flexflix">Github</NavLink></li>
                        <li><button onClick={ logout }>Odjava</button></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;