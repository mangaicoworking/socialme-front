import React from 'react';
import './Idea.css';
import ImagemSection3 from './../../../../Assets/Images/image4.svg';

const HomeIdea = () => {
    return ( 
        <>
            <div className="HomeIdea">
                <div className="container">
                    <div className="row HomeIdeaRow">
                    <div className="col-md-6">
                            <div className="HomeIdea-ImageContainer">
                               <img data-aos="fade-right" src={ImagemSection3} alt="Descrição" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="HomeIdea-TextContainer">
                                <h1 data-aos="fade-left">Ideia e Fundação</h1>
                                <p data-aos="fade-in">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, porttitor eget facilisis ac, fringilla maximus magna. In porttitor libero nec pretium posuere. Praesent accumsan lectus ac pretium finibus. Etiam blandit, tortor at scelerisque pellentesque, purus odio lacinia turpis, vitae rhoncus lorem elit sagittis nibh.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default HomeIdea;