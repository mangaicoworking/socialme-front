import React from 'react';
import './style.css';

export default function PopoverSimples(props) {
  return (
    <>
        <span className="qs">
            {props.gatilho}
            <span className="popover above">{props.texto}</span>
        </span>
    </>
  );
}