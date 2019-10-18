import React, { useState, useEffect } from "react";
import './style.css';
import FilterRow from './Componentes/FilterRow';
import ContainerCards from './Componentes/ContainerCards';
import api from './../../../../../Services/api';
import { MakeRouteWithSubRoutes } from '../../../../../makeRouteWithSubRoutes';

/*
console.log('ULR -> '+ window.location.href);
console.log('Domain -> '+ window.location.hostname);
console.log('path -> '+ window.location.pathname);
console.log('protocol -> '+ window.location.protocol);
*/

export default function PainelGestoraProgramas({routes, match}) {
  const [values, setValues] = useState({
    gestoraId: '5d93a0417e87f339288f189b',
    programas: [],
    consultouAPI: false
  });
//PEGA DADOS DA PESSOA DA API
  useEffect(() => {
    const obj = {
      quantidade :"25",
      pagina: "1",
      ordenar: {
        por:"valor",
        ordem:"asc"
      }
    };
    api.post(`/programas/${values.gestoraId}`, obj)
    .then(res => {
      if(res.data.meta.codigo === '0004002001'){
        setValues({ 
          ...values, 
          programas: res.data.programas,
          consultouAPI: true
        });
      }
    })
    .catch(function (error) {
        console.log(error);
    })
  }, []);

  return (
    <>
    {window.location.pathname === '/me/painel-da-gestora/programas' ?
      <>
        <FilterRow />
        <ContainerCards todosOsProgramas={values.programas} />
      </>
    :
      routes.map((route, index) => <MakeRouteWithSubRoutes key={index} {...route} />)
    }
    </>
  );
}