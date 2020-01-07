import React, { Fragment } from 'react';
import './Button.scss';

const button = (props) => {

    let classes = ['btn'];
    let buttonJSX = null;

    switch (props.type) {
        case "submit":
            buttonJSX =
                <button
                    type="submit"
                    className={classes.join(' ')}>{props.children}
                </button>
            break;
        case "button":
            buttonJSX =
                <button
                    type="button"
                    className={classes.join(' ')}
                    onClick={props.clicked}>{props.children}
                </button>
            break;
        default: break;
    }

    return (
        <Fragment>
            {buttonJSX}
        </Fragment>
    );
}

export default button;