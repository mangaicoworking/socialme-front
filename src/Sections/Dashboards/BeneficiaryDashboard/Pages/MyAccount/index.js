import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import { MakeRouteWithSubRoutes } from '../../../../../makeRouteWithSubRoutes';

const beneficiaryDashboardMyAccountTabsItens = [
  {
    "icone" : "fas fa-user-friends",
    "titulo" : "Oportunidades",
    "slug" : "oportunidades"
  },
  {
    "icone" : "fas fa-user-edit",
    "titulo" : "Meus Programas",
    "slug" : "meus-programas"
  },
  {
    "icone" : "fas fa-user-friends",
    "titulo" : "Minhas Atividades",
    "slug" : "minhas-atividades"
  },
  {
    "icone" : "fas fa-user-friends",
    "titulo" : "Financeiro",
    "slug" : "financeiro"
  },
  {
    "icone" : "fas fa-user-friends",
    "titulo" : "Linha do Tempo",
    "slug" : "linha-do-tempo"
  }
]

export default function BeneficiaryDashboardMyAccount({routes, match}){
  const [values, setValues] = useState({
    quantidadeDeItensNasTabs : beneficiaryDashboardMyAccountTabsItens.length,
    tamanhoSlider: 0,
    translateSlider: 0,
    activeTab: 'Relações'
  });

  useEffect(() => {
    let valor = 100/values.quantidadeDeItensNasTabs;
    setValues({ ...values, tamanhoSlider: valor });
  }, []);

  const toogleActiveTab = (tabClicada) => {
    setValues({ ...values, activeTab: tabClicada });
  }

  const renderContentTab = () => {
    switch (values.activeTab) {
      case 'Oportunidades':
      default:
        return <p>Oportunidades</p>;
      case 'Meus Programas':
        return <p>Meus Programas</p>;
      case 'Minhas Atividades':
        return <p>Minhas Atividades</p>;
      case 'Financeiro':
        return <p>Financeiro</p>;
      case 'Linha do Tempo':
        return <p>Linha do Tempo</p>;
    }
  }

  return (
    <>
      <div className="beneficiaryDashboardMyAccount-generalContainer">
        <div className="beneficiaryDashboardMyAccount-tabsContainer">
            <ul className="beneficiaryDashboardMyAccount-tabsContainer-ul">
              {beneficiaryDashboardMyAccountTabsItens.map(item => 
                <Link to={`${match.url}/${item.slug}`} key={item.slug}>
                  <li
                    className={"beneficiaryDashboardMyAccount-tabsContainer-li"}
                    onClick={() => toogleActiveTab(item.titulo)}
                  >
                    <label className={(window.location.pathname === `${match.url}/${item.slug}` ? 'active' : '')}>
                      <i className={item.icone}></i>
                      <span>{item.titulo}</span>
                    </label>
                  </li>
                </Link>
              )}
            </ul>
        </div>

        {window.location.pathname === '/me/painel-da-beneficiaria/minha-conta' ?
          <Redirect to={`/me/painel-da-beneficiaria/minha-conta/oportunidades`} />
        :
          routes.map((route, index) => <MakeRouteWithSubRoutes key={index} {...route} />)
        }

      </div>
    </>
  );
}