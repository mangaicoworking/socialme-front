import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Logo from './../../../../../Assets/Images/logo.png';
import SelectLanguage from './../../../../SelectLanguage';
import { AuthContext } from './../../../../../Contexts/AuthContext';

export default function NavbarAuthenticated(props) {
  const { person, institution } = useContext(AuthContext);

  const renderUserNavbar = () => {
    if(person){
      return(
        <>
          <Link to="/me/painel-da-beneficiaria/minha-conta"><button className="btn btn-outline">Acessar</button></Link>
          <p style={{color: 'var(--white)', marginRight: '10px'}}>Olá {person.profile.name} !</p>
        </>
      )
    }else if(institution){
      return(
        <>
          <Link to="/me/painel-da-gestora/movimentacoes"><button className="btn btn-outline">Acessar</button></Link>
          <p style={{color: 'var(--white)', marginRight: '10px'}}>Olá {institution.profile.name} !</p>
        </>
      )
    }else{
      return(
        <>
          <Link to="/entrar"><button className="btn btn-outline">Registrar</button></Link>
          <Link to="/entrar"><button className="btn btn-outline">Entrar</button></Link>
        </>
      )
    }
  }
    return (
        <>
          <nav className="navbar-main">
            <div className="container">
              <div className="row">
                <div className="col-md-1">
                  <img className="brand" src={Logo} alt="Logo Social Me" />
                </div>
                <div className="col-md-10 ml-auto right-buttons">
                  <div>
                    <ul>
                      {/* 
                      <li className="dropdown-item">
                        Sobre <i className="fas fa-chevron-down"></i>
                        <ul className="dropdown-menu">
                          <li>Quem somos</li>
                          <li>Como funciona</li>
                          <li>Onde estamos</li>
                          <li>Impacto</li>
                        </ul>
                      </li>
                      */}
                      <li>Quem somos</li>
                      <li>Como funciona</li>
                      <li>Onde estamos</li>
                      <li>Impacto</li>
                      <li>Blog</li>
                      <li>Doe</li>
                    </ul>
                  </div>
                  <div className="dividerVertical"></div>
                  <SelectLanguage />
                  {renderUserNavbar()}
                </div>
              </div>
            </div>
          </nav>
        </>
    );
}