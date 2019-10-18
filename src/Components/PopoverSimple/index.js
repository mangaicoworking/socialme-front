import React from 'react';
import './style.css';

export default function PopoverSimple(props) {
  return (
    <>
        <div className={"Popover Popover--top js-popover " + (props.open ? 'is-visible' : '')}>
            {props.content}
        </div>
    </>
  );
}