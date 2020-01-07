import React from 'react';
import './Input.scss';

const input = (props) => {

    let type = props.type;

    if (type !== "text" && type !== "password") {
        type = "text";
    }

    return (
        <div className="input">
            <label className="input__label" htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                name={props.name}
                className="input__text"
                type={type}
                aria-label={props.label}
                aria-required="true"
                value={props.value}
                onChange={props.changed}
            />
        </div>
    )
}

export default input;