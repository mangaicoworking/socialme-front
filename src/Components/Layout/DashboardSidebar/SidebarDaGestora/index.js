import React from 'react';
import { NavLink } from "react-router-dom";

const itensDoMenu = [
    {
      "icone" : "far fa-user",
      "titulo" : "Movimentações",
      "slug" : "movimentacoes"
    },
    {
      "icone" : "far fa-address-card",
      "titulo" : "Programas",
      "slug" : "programas"
    },
    {
      "icone" : "far fa-question-circle",
      "titulo" : "Gestor de Benefícios",
      "slug" : "gestor-de-beneficios"
    },
    {
      "icone" : "far fa-question-circle",
      "titulo" : "Dúvidas",
      "slug" : "duvidas"
    },
  ]

export default function SidebarDaGestora(props) {
  return (
    <>
      <div className="sidebarMenu">
        {itensDoMenu.map(item =>
          <NavLink 
            className={"sidebarItemMenu"} 
            to={`${props.urlPai}/${item.slug}`} 
            key={item.titulo}
            activeStyle={{
              backgroundColor: 'var(--primaryLight)',
              fontWeight: "bold",
              color: "var(--white)",
              opacity: "1",
              borderLeft: '3px solid var(--white)'
            }}
          >
            <i className={item.icone}></i>
            <p className={(props.sidebarOpen ? '' : 'tituloSome')}>{item.titulo}</p>
          </NavLink>
        )}
      </div>
    </>
  );
}

/* 
<ul className="sidebarMenu">
  {itensDoMenu.map(item =>
    <NavLink to={`${props.urlPai}/${item.slug}`} key={item.titulo}>
      <li 
        className={"sidebarItemMenu " + (props.paginaAtiva === item.slug ? 'sidebarItemActive' : '')}  
      >
        <i className={item.icone}></i>
        <p className={(props.sidebarOpen ? '' : 'tituloSome')}>{item.titulo}</p>
      </li>
    </NavLink>
  )}
</ul>
*/