import React from 'react';
/* import ChooseDashboard from './ChooseDashboard'; */
import { MakeRouteWithSubRoutes } from '../../makeRouteWithSubRoutes';
import './style.css';

/* 
  Verifica quais dashboards o usuário pode ter acesso, caso só tenha 1, redireciona automáticamente,
  Caso tenha mais de 1, carrega o componente ChooseDashboard com as opções para o usuário escolher
*/

export default function Dashboards({routes, match}) {

  return (
    <>
      {
        routes.map((route, index) => <MakeRouteWithSubRoutes key={index} {...route} />)
      }
    </>
  );

}