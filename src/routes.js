import React from 'react';
import { MakeRouteWithSubRoutes } from './makeRouteWithSubRoutes';
import { Switch, Link } from 'react-router-dom';

//Páginas Gerais
import { Home } from './Sections/Home';
import Page404 from './Sections/404';
import { Login } from './Sections/Login';
//Páginas de Lógicas
import Dashboards from './Sections/Dashboards';
//Painel da Gestora
import ManagerDashboard from './Sections/Dashboards/ManagerDashboard';
import ManagerDashboardMoves from './Sections/Dashboards/ManagerDashboard/Pages/Moves';
import ManagerDashboardPrograms from './Sections/Dashboards/ManagerDashboard/Pages/Programs';
  import ManagerDashboardProgramsAdd from './Sections/Dashboards/ManagerDashboard/Pages/ProgramsAdd';
  import ManagerDashboardProgram from './Sections/Dashboards/ManagerDashboard/Pages/Program';
  import ManagerDashboardProgramLinkBeneficiary from './Sections/Dashboards/ManagerDashboard/Pages/Program/Tabs/LinkBeneficiary';
import ManagerDashboardBenefitManager from './Sections/Dashboards/ManagerDashboard/Pages/BenefitManager';
import ManagerDashboardFQA from './Sections/Dashboards/ManagerDashboard/Pages/FQA';
//Painel da Beneficiária
import BeneficiaryDashboard from './Sections/Dashboards/BeneficiaryDashboard';
import BeneficiaryDashboardMyAccount from './Sections/Dashboards/BeneficiaryDashboard/Pages/MyAccount';
  import BeneficiaryDashboardMyAccountFinancial from './Sections/Dashboards/BeneficiaryDashboard/Pages/MyAccount/Tabs/Financial';
  import BeneficiaryDashboardMyAccountMyActivities from './Sections/Dashboards/BeneficiaryDashboard/Pages/MyAccount/Tabs/MyActivities';
  import BeneficiaryDashboardMyAccountMyPrograms from './Sections/Dashboards/BeneficiaryDashboard/Pages/MyAccount/Tabs/MyPrograms';
  import BeneficiaryDashboardMyAccountOpportunities from './Sections/Dashboards/BeneficiaryDashboard/Pages/MyAccount/Tabs/Opportunities';
  import BeneficiaryDashboardMyAccountTimeline from './Sections/Dashboards/BeneficiaryDashboard/Pages/MyAccount/Tabs/Timeline';
import BeneficiaryDashboardMyRegister from './Sections/Dashboards/BeneficiaryDashboard/Pages/MyRegister';
import BeneficiaryDashboardFQA from './Sections/Dashboards/BeneficiaryDashboard/Pages/FQA';

import { TopicList } from './views/TopicList';

const TopicDetail = ({ routes, match }) => {
  return (
    <div>
      <hr />
      <h3>{match.params.topicId}</h3>
      <ul>
        <li>
          <Link to="/Topics">Back to Topics</Link>
        </li>
      </ul>
    </div>
  );
};

const routes = [
  {
    path: "/",
    exact: true,
    protected: false,
    component: Home
  },
  {
    path: "/me",
    component: Dashboards,
    protected: true,
    routes: [
      {
        path: "/me/painel-da-gestora",
        component: ManagerDashboard,
        routes: [
          {
            path: "/me/painel-da-gestora/movimentacoes",
            component: ManagerDashboardMoves
          },
          {
            path: "/me/painel-da-gestora/programas",
            component: ManagerDashboardPrograms,
            routes: [
              {
                path: "/me/painel-da-gestora/programas/adicionar",
                component: ManagerDashboardProgramsAdd
              },
              {
                path: "/me/painel-da-gestora/programas/ver/:idDoPrograma",
                component: ManagerDashboardProgram,
                routes: [
                  {
                    path: "/me/painel-da-gestora/programas/ver/:idDoPrograma/vincular-beneficiario",
                    component: ManagerDashboardProgramLinkBeneficiary
                  }
                ]
              }
            ]
          },
          {
            path: "/me/painel-da-gestora/gestor-de-beneficios",
            component: ManagerDashboardBenefitManager
          },
          {
            path: "/me/painel-da-gestora/duvidas",
            component: ManagerDashboardFQA
          },
        ]
      },
      {
        path: "/me/painel-da-beneficiaria",
        component: BeneficiaryDashboard,
        routes: [
          {
            path: "/me/painel-da-beneficiaria/minha-conta",
            component: BeneficiaryDashboardMyAccount,
            routes: [
              {
                path: "/me/painel-da-beneficiaria/minha-conta/oportunidades",
                component: BeneficiaryDashboardMyAccountOpportunities
              },
              {
                path: "/me/painel-da-beneficiaria/minha-conta/meus-programas",
                component: BeneficiaryDashboardMyAccountMyPrograms
              },
              {
                path: "/me/painel-da-beneficiaria/minha-conta/minhas-atividades",
                component: BeneficiaryDashboardMyAccountMyActivities
              },
              {
                path: "/me/painel-da-beneficiaria/minha-conta/financeiro",
                component: BeneficiaryDashboardMyAccountFinancial
              },
              {
                path: "/me/painel-da-beneficiaria/minha-conta/linha-do-tempo",
                component: BeneficiaryDashboardMyAccountTimeline
              }
            ]
          },
          {
            path: "/me/painel-da-beneficiaria/meu-cadastro",
            component: BeneficiaryDashboardMyRegister,
          },
          {
            path: "/me/painel-da-beneficiaria/duvidas",
            component: BeneficiaryDashboardFQA,
          },
        ]
      }
    ]
  },
  {
    path: "/Topics",
    component: TopicList,
    routes: [
      {
        path: "/Topics/:topicId",
        component: TopicDetail
      },
    ]
  },
  {
    path: "/entrar",
    protected: false,
    component: Login,
  },
  {
    path: "/:WhereTheHeckIsThat",
    component: Page404,
  }
];

export const Routes = (props) => {
  return (
    <div>
      <Switch>
        {
          routes.map(
            (route, index) => <MakeRouteWithSubRoutes key={index} {...route} />
          )
        }
      </Switch>
    </div>
  );
};