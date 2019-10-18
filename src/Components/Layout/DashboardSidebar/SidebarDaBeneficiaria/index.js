import React from 'react';
import { NavLink } from "react-router-dom";

const itensDoMenu = [
    {
      "icone" : "far fa-user",
      "titulo" : "Minha Conta",
      "slug" : "minha-conta"
    },
    {
      "icone" : "far fa-address-card",
      "titulo" : "Meu Cadastro",
      "slug" : "meu-cadastro"
    },
    {
      "icone" : "far fa-question-circle",
      "titulo" : "Dúvidas",
      "slug" : "duvidas"
    },
  ]

export default function SidebarDaBeneficiaria(props) {
  return (
    <>
       <div className="sidebarMenu">
        {itensDoMenu.map(item =>
          <NavLink 
            className={"sidebarItemMenu"} 
            to={`${props.urlPai}/${item.slug}`} 
            key={item.titulo}
            activeStyle={{
              backgroundColor: 'var(--white)',
              fontWeight: "bold",
              color: "var(--primary)",
              opacity: "1"
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