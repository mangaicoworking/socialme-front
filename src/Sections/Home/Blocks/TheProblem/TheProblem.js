import React from 'react';
import './TheProblem.css';
import { HexagonalBox } from './Components/HexagonalBox';
import Image2 from './../../../../Assets/Images/image3.svg';

const TheProblem = () => {
    return ( 
        <>
            <div className="HomeTheProblem">
                <div className="container">
                    <div className="row HomeTheProblemRow">
                        <div className="col-md-6">
                            <div className="HomeTheProblem-HexasContainer">
                                <h1 data-aos="fade-right">O Problema</h1>
                                <HexagonalBox 
                                    icon="fas fa-search-dollar" 
                                    text="Cras ultricies vitae erat nec dictum. Sed at ipsum ipsum. Sed pulvinar commodo sem, id facilisis dui pharetra at. Etiam id sem nec lectus auctor commodo." 
                                />
                                <HexagonalBox 
                                    icon="fas fa-hand-holding-usd" 
                                    text="Sed eu tempus lectus. Quisque arcu ligula, mollis ac tincidunt vel, vehicula eu lectus. Aenean dictum libero et gravida vulputate." 
                                />
                                <HexagonalBox 
                                    icon="far fa-grin-hearts" 
                                    text="Maecenas tristique, dui non condimentum tincidunt, velit mi fermentum lacus, quis pretium nunc nisl non purus." 
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="HomeTheProblem-ImageContainer">
                                <img data-aos="fade-left" src={Image2} alt="Imagem de ilustração" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default TheProblem;