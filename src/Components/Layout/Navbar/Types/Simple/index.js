import React from 'react';
import { Link } from "react-router-dom";
import Logo from './../../../../../Assets/Images/logo.png';

export default function NavbarUnauthenticated() {
    return (
        <>
          <nav className="navbar-main navbar-simple">
            <div className="container">
              <div className="row">
                <Link className="brandLink"  to="/">
                  <img className="brand" src={Logo} alt="Logo Social Me" />
                </Link>
              </div>
            </div>
          </nav>
        </>
    );
}