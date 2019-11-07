import React from 'react'

import classes from './Button.css';

const button = (props) => {

    let buttonClass = [classes.Button];

    if (props.type === 'primary') {
        buttonClass.push(classes.Primary)
    }

    return (
        <p className={classes.ButtonWrapper}><button style={{ marginTop: '4px' }} className={buttonClass.join(' ')}>{props.children}</button></p>
    )
}


export default button;
