import React from 'react';
import './style.css';

export default function Accordion(props) {
    const array = [
        "","","","","","",""
    ]

  return (
    <>
        <div className="accordionTabs">

            {array.map((item, index) => 
                <div key={index} className="accordionTab">
                    <input type="checkbox" id={`chck${index}`}/>
                    <label className="accordionTab-label" htmlFor={`chck${index}`}>Item {index+1}</label>
                    <div className="accordionTab-content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
                    </div>
                </div>
            )}

        </div>
    </>
  );
}