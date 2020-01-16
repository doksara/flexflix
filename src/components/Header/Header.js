import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const header = (props) => {
    return (
        <header>
            <div className="navigation-container">
                <nav>
                    <ul>
                        <li><NavLink activeClassName="" to="/discover">Home</NavLink></li>
                        <li><NavLink activeClassName="" to="/about">About</NavLink></li>
                        <li><NavLink activeClassName="" to="https://github.com/doksara/flexflix">Github</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default header;