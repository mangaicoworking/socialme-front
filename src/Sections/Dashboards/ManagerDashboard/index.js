import React, { useState } from 'react';
import DashboardNavbar from './../../../Components/Layout/DashboardNavbar';
import DashboardSidebar from './../../../Components/Layout/DashboardSidebar';
import { MakeRouteWithSubRoutes } from '../../../makeRouteWithSubRoutes';
import './../dashboardGeneral.css';

export default function ManagerDashboard({routes, match}) {
  const [values, setValues] = useState({
    sidebarOpen: true,
    urlPai: match.url,
  });
//Recebe o valor se o Sidebar fica aberto ou fechado
  const navbarFilhoAvisaSeBotaoSidebarFoiApertado = (value) => {
    if(values.sidebarOpen){
        setValues({ ...values, sidebarOpen: false });
    }else{
        setValues({ ...values, sidebarOpen: true });
    }
  }
  return (
    <>
      <div className="dashboardGeneral">
        <div 
          className={"containerSidebar " + (values.sidebarOpen ? 'containerSidebarOpen' : 'containerSidebarClose')}
        >
          <DashboardSidebar 
            sidebarOpen={values.sidebarOpen}
            urlPai={values.urlPai}
          />
        </div>
        <div className="containerContent">
          <DashboardNavbar 
            avisaPaiSeBotaoSidebarFoiApertado={navbarFilhoAvisaSeBotaoSidebarFoiApertado.bind(this)} 
            sidebarOpen={values.sidebarOpen}
          />
          <div className="containerOnlyContent">            
            {
              routes.map((route, index) => <MakeRouteWithSubRoutes key={index} {...route} />)
            }
          </div>
        </div>
      </div>
    </>
  );
}