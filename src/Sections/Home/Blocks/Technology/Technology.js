import React from 'react';
import './Technology.css';
import ImagemSection4 from './../../../../Assets/Images/image5.svg';

const HomeTechnology = () => {
    return ( 
        <>
            <div className="HomeTechnology">
                <div className="container">
                    <div className="row HomeTechnologyRow">
                        <div className="col-md-6">
                            <div className="HomeTechnology-TextContainer">
                                <h1 data-aos="fade-right">Tecnologia</h1>
                                <p data-aos="fade-in">Sed eu tempus lectus. Quisque arcu ligula, mollis ac tincidunt vel, vehicula eu lectus. Aenean dictum libero et gravida vulputate. Mauris id leo ut eros euismod pretium nec sit amet odio. In hac habitasse platea dictumst. Nullam tempor lorem euismod ornare blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus fringilla sem et massa placerat, a gravida dolor blandit.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="HomeTechnology-ImageContainer">
                               <img data-aos="fade-left" src={ImagemSection4} alt="Descrição" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default HomeTechnology;