import React from 'react';
import { Link } from "react-router-dom";
import BuscaIconeAnimado from './../../BuscaIconeAnimado';
import Michael from './../../../Assets/Images/michael.jpg';
import Dunder from './../../../Assets/Images/dunder.jpg';
import BellNotification from './../../BellNotification';
import './style.css';

export default function NavbarDashboard(props) {
    const renderUserInformation = () => {
      switch(props.urlPai) {
        case '/me/beneficiaria':
        default:
          return(
            <div className="actionsUserProfile">
              <div className="containerImagemUsuario" style={{backgroundImage: `url(${Michael})`}} />
              <p>Michael Scott</p>
              <i className="fas fa-chevron-down"></i>
            </div>
          )
        case '/me/gestora':
          return(
            <div className="actionsUserProfile">
              <div className="containerImagemUsuario" style={{backgroundImage: `url(${Dunder})`}} />
              <p>Dunder Mifflin</p>
              <i className="fas fa-chevron-down"></i>
            </div>
          )
      }
    }
    return (
        <>
          <nav className="navbar-dashboard">
              <div className="containerBotaoToggleSidebar" onClick={() => props.avisaPaiSeBotaoSidebarFoiApertado(true)}>
                <div className="arrowBotaoToggleSidebar">
                  <i className={"fas fa-arrow-right " + (props.sidebarOpen ? 'espelharIcone' : '')}></i>
                </div>
                <div className="iconBotaoToggleSidebar">
                  {props.sidebarOpen ?
                    <i className="fas fa-bars"></i>
                  :
                    <i className="fas fa-grip-vertical"></i>
                  }
                </div>
              </div>
              <div className="rightItens">
                <BuscaIconeAnimado />
                <ul className="navbarDashboardRightItens-ul">
                  <li className="navbarDashboardRightItens-li">
                    <Link to={"/me/painel-da-beneficiaria"}>
                      <i className="far fa-smile"></i>
                    </Link>
                  </li>
                  <li className="navbarDashboardRightItens-li">
                    <Link to={"/me/painel-da-gestora"}>
                      <i className="far fa-building"></i>
                    </Link>
                  </li>
                  <li className="navbarDashboardRightItens-li">
                    <i className="far fa-envelope"></i>
                  </li>
                  <li className="navbarDashboardRightItens-li">
                    {renderUserInformation()}
                  </li>
                  <li className="navbarDashboardRightItens-li">
                    <BellNotification />
                  </li>
                </ul>
                
                
                
                
               
                
                
                
              </div>
          </nav>
        </>
    );
}