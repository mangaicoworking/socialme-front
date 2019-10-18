import React from 'react';
import Logo from './../../../Assets/Images/logo.png';
import SidebarDaBeneficiaria from './SidebarDaBeneficiaria';
import SidebarDaGestora from './SidebarDaGestora';

export default function PainelSidebar(props) {
  const renderSidebarAtual = () =>{
    switch(props.urlPai) {
      case '/me/painel-da-beneficiaria':
      case '/me/painel-da-beneficiaria/':
      default:
        return(
          <SidebarDaBeneficiaria
            sidebarOpen={props.sidebarOpen}
            paginaAtiva={props.paginaAtiva}
            urlPai={props.urlPai}
          />
        )
      case '/me/painel-da-gestora':
      case '/me/painel-da-gestora/':
        return(
          <SidebarDaGestora 
            sidebarOpen={props.sidebarOpen}
            paginaAtiva={props.paginaAtiva}
            urlPai={props.urlPai}
          />
        )
    }
  }

  return (
    <div className="sidebarDashboard">
      <div className="sidebarContainerBrand">
        <img className={" "+(props.sidebarOpen ? 'logoSidebarOpen' : 'logoSidebarClose')} src={Logo} alt="Logo Social Me" />
      </div>
      
      {renderSidebarAtual()}

    </div>
  );
}