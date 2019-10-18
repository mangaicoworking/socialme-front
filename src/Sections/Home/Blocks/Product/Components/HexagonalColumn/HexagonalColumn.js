import React from 'react';
import './HexagonalColumn.css';

const HomeProductHexagonalColumn = (props) => {
    return ( 
        <div data-aos="fade-up" className="HomeProduct-HexagonalColumnContainer">
            <span className='HomeProduct-HexagonalColumn'>
                <i className={props.icon}></i>
            </span>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
     );
}
 
export default HomeProductHexagonalColumn;