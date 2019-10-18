import React from 'react';
import './Product.css';
import ImagemSection5 from './../../../../Assets/Images/image6.svg';
import { HexagonalColumn } from './Components/HexagonalColumn';

const HomeProduct = () => {
    return ( 
        <>
            <div className="HomeProduct-GeneralContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                           <h1 data-aos="fade-up">Produto</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <img data-aos="fade-right" src={ImagemSection5} alt="Descrição" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3" style={{display:'flex'}}>
                            <HexagonalColumn
                                icon="fas fa-chart-line"
                                title="Maecenas tristique"
                                text="Praesent vel vehicula elit. Pellentesque placerat, augue eget pretium tempus, libero enim bibendum ante, vitae ultricies justo nisl at odio."
                            />
                        </div>
                        <div className="col-md-3" style={{display:'flex'}}>
                            <HexagonalColumn
                                icon="fas fa-code-branch"
                                title="Sed dapibus"
                                text="Velit mi fermentum lacus, quis pretium nunc nisl non purus. Praesent vel vehicula elit. Pellentesque placerat, augue eget pretium tempus."
                            />
                        </div>
                        <div className="col-md-3" style={{display:'flex'}}>
                            <HexagonalColumn
                                icon="far fa-eye"
                                title="Etiam blandit"
                                text="Nullam tempor lorem euismod ornare blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                            />
                        </div>
                        <div className="col-md-3" style={{display:'flex'}}>
                            <HexagonalColumn
                                icon="fas fa-map-marked-alt"
                                title="Vivamus fringilla"
                                text="Quisque imperdiet ut elit ut lacinia. Phasellus a orci augue. Integer congue gravida ligula vel elementum."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default HomeProduct;