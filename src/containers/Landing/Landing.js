import React, { Component } from 'react';

import RegistrationForm from '../../components/Form/RegistrationForm/RegistrationForm';
import Hero from '../../components/Hero/Hero';

import classes from './Landing.css';

class Landing extends Component {
    render() {
        return (
            <div className={classes.LandingContainer}>
                <RegistrationForm />
                <Hero />
            </div>
        )
    }
}

export default Landing;
