import React from 'react';

import Logo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = () => {
    return (
        <img src={Logo} className={classes.Logo} alt="Movie App" />
    );
};

export default logo;

