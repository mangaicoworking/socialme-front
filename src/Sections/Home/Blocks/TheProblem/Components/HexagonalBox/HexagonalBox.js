import React from 'react';
import './HexagonalBox.css';

const HomeTheProblemHexagonalBox = (props) => {
    return ( 
        <div data-aos="fade-in" className="HomeTheProblem-HexagonalContainer">
            <div className="HomeTheProblem-HexagonalImage">
                <span className='HomeTheProblem-Hexagonal'>
                    <i className={props.icon}></i>
                </span>
            </div>
            <div className="HomeTheProblem-HexagonalText">
                <p>{props.text}</p>
            </div>
        </div>
     );
}
 
export default HomeTheProblemHexagonalBox;