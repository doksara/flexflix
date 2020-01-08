import React from 'react';
import './Alert.scss';

const alert = (props) => {

    let classes = ["alert"];

    classes.push("alert--" + props.type);

    return (
        <article className={classes.join(' ')}>
            <span>{props.message}</span>
        </article>
    )
}

export default alert;