import React from 'react';

import NavigationItem from '../NavigationItem/NavigationItem';
import Logo from '../../Logo/Logo';
import classes from './Navbar.css';

const navbar = (props) => {
    return (
        <header className={classes.Header}>
            <div className={classes.NavigationContainer}>
                <Logo />
                <nav className={classes.Navbar}>
                    <ul className={classes.NavigationItems}>
                        <NavigationItem exact link="/" active>Home</NavigationItem>
                        <NavigationItem link="/movies" active>Movies</NavigationItem>
                        <NavigationItem link="/tv-shows">TV Shows</NavigationItem>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default navbar;