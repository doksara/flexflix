import React from 'react';

import classes from './Input.css';

const input = (props) => {

    const inputClasses = [classes.InputContainer];
    let inputElement = null;

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Incorrect);
    } else if (props.touched && !props.invalid) {
        inputClasses.push(classes.Correct);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.InputElement} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select className={classes.InputElement} value={props.value} onChange={props.changed} >

                </select>
            );
            break;
        default:
            inputElement = <input className={classes.InputElement} value={props.value} onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.label}</label>
            <span className={inputClasses.join(' ')}>{inputElement}</span>
            <span>{(props.invalid && props.touched) ? props.warningMessage : null}</span>
        </div>
    )
}

export default input;
