import React from 'react';
import './Header.css';
import ImagemSection1 from './../../../../Assets/Images/image2.svg';

const HeaderHome = () => {
    return ( 
        <>
            <div className="HeaderHome-GeneralContainer">
                <div className="HeaderHome-Section1">
                    <div className="container" style={{display: 'flex'}}>
                        <div className="HeaderHome-Section1-ImageContainer">
                            <img data-aos="fade-up" src={ImagemSection1} className="HeaderHome-Section1-Image" alt="Testando" />
                        </div>
                        <div className="HeaderHome-Section1-Texts">
                            <h1 data-aos="fade-in">Social Me</h1>
                            <p data-aos="fade-in">Donec at augue a urna mattis lobortis a quis orci. Mauris non erat nec ante fermentum maximus non quis nulla.</p>
                            <button data-aos="fade-in" className="btn btn-3d btn-3d-secondary">Começar</button>
                        </div>
                    </div> 
                </div>
                <div className="HeaderHome-Section1Diagonal"></div>
                <div className="HeaderHome-Section1-Circle">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        </>
     );
}
 
export default HeaderHome;