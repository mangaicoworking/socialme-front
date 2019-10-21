import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import './index.css';
import { AuthContext } from './../../../../../Contexts/AuthContext';
import DefaultImage from './../../../../../Assets/Images/user.png';

const UserDropdownMenu = (props) => {
    const { logout } = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const toggleOpen = () =>{
        setOpen(!open);
    }
    return ( 
        <div className="DashboardNavbar-UserDropdownMenu-GeneralContainer">
            <div onClick={toggleOpen} className={"DashboardNavbar-UserDropdownMenu-Dropdown "+(open ? 'DashboardNavbar-UserDropdownMenu-Dropdown-open' : '')}>
                <div className="DashboardNavbar-UserDropdownMenu-container">
                    <div className="DashboardNavbar-UserDropdownMenu-Dropdown-containerImagemUsuario" style={{backgroundImage: `url(${props.photo ? props.photo : DefaultImage})`}} />
                    <p>{props.name}</p>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <ul className={(open ? 'DashboardNavbar-UserDropdownMenu-Dropdown-ul-open' : 'DashboardNavbar-UserDropdownMenu-Dropdown-ul-close')}>
                    <li><a href="# ">Meu Perfil</a></li>
                    <li><a href="# ">Configurações</a></li>
                    <li><a href="# ">Suporte</a></li>
                    <li onClick={logout}>
                        <Link to={"/"}>
                            Sair
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
     );
}
 
export default UserDropdownMenu;