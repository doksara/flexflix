import React from 'react';
import './Layout.scss';

const layout = (props) => {
    return (
        <div className="layout">
            {props.children}
        </div>
    )
}

export default layout;
