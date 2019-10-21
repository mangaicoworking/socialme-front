import React, { useContext } from 'react';
import { AuthContext } from './../../../Contexts/AuthContext';
import BuscaIconeAnimado from './../../BuscaIconeAnimado';
import BellNotification from './../../BellNotification';
import UserDropdownMenu from './Components/UserDropdownMenu';
import './style.css';

export default function NavbarDashboard(props) {
  const { person, institution } = useContext(AuthContext);
    
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
            {/* 
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
            */}
            <li className="navbarDashboardRightItens-li">
              <i className="far fa-envelope"></i>
            </li>
            <li className="navbarDashboardRightItens-li">
              {person ?
                <UserDropdownMenu name={person.profile.name} photo={person.profile.photo} />
              :
                <></>
              }
              {institution ?
                <UserDropdownMenu name={institution.profile.fantasyName} photo={institution.profile.photo} />
              :
                <></>
              }
              
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