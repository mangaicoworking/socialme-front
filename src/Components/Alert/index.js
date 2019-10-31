import React, { useState } from 'react';
import './style.css';

export default function Alert(props) {
  const [values] = useState({
      type: props.type,
      position: props.position,
      text: props.text
  });
  return (
    <>
      <div 
        className={"notify do-show " + (values.position)} 
        data-notification-status={(values.type)}
      >
        {values.text}
      </div>
    </>
  );
}