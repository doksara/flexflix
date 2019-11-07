import React from 'react';

import HeroImage from '../../assets/images/hero.png';
import classes from './Hero.css'

const hero = (props) => {
    return (
        <div className={classes.HeroWrapper}>
            <img src={HeroImage} alt="Hero image" />
        </div>
    );
}

export default hero;