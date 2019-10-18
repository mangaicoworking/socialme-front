import React from 'react';
import './NotificationAnimation.css';

const NotificationAnimation = (props) => {
    return ( 
        <div className="rectangle" style={{backgroundColor: `var(--${props.color})` }}>
            <div className="notification-text">
                <i className={props.icon}></i>
                <span>{props.text}</span>
            </div>
        </div>
    );
}
 
export default NotificationAnimation;