import React from 'react';
import './Tag.scss';

const Tag = (props) => {
    return (
        <span className="tag" color={props.color}>{props.children}</span>
    );
};

export default Tag;