import React from 'react';
import { Link } from "react-router-dom";
import Logo from './../../../../../Assets/Images/logo.png';
import SelectLanguage from './../../../../SelectLanguage';

export default function NavbarUnauthenticated() {
    return (
        <>
          <nav className="navbar-main">
            <div className="container">
              <div className="row">
                <div className="col-md-1">
                  <img className="brand" src={Logo} alt="Logo Social Me" />
                </div>
                <div className="col-md-9 ml-auto right-buttons">
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
                  <Link to="/entrar"><button className="btn btn-outline">Registrar</button></Link>
                  <Link to="/entrar"><button className="btn btn-outline">Entrar</button></Link>
                </div>
              </div>
            </div>
          </nav>
        </>
    );
}