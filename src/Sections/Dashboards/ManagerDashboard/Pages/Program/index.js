import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css';
import axios from 'axios';
import ActionBox from './Components/ActionBox';
import Informations from './Components/Informations';
import TableLatestRegisters from './Components/TableLatestRegisters';
import TableBenefits from './Components/TableBenefits';
import { MakeRouteWithSubRoutes } from '../../../../../makeRouteWithSubRoutes';
import api from './../../../../../Services/api';

export default function ManagerDashboardProgram({routes, match}) {
  const [values, setValues] = useState({
    programa: {},
    consultouAPI: false
  });
  //PEGA DADOS DA PESSOA DA API
  useEffect(() => {
    /*
    api.get(`/program/${match.params.idDoPrograma}`)
    .then(res => {
      console.log(res.data)
      setValues({ 
        ...values, 
        programa: res.data.programa,
        consultouAPI: true
      });
    })
    .catch(function (error) {
        console.log(error);
    })
    */
   const obj = {
      quantidade :"25",
      pagina: "1",
      ordenar: {
        por:"valor",
        ordem:"asc"
      }
    };
    //api.post(`/programs`, obj)
    axios({
      baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
      headers: {'mundo-data-token': localStorage.getItem('token')},
      method: 'post',
      url: '/programs',
      data: {
        quantidade :"25",
        pagina: "1",
        ordenar: {
          por:"valor",
          ordem:"asc"
        }
      }
    })
    .then(res => {
      for(let i = 0; i <= res.data.data.ProgramsList.length; i++){
        if(res.data.data.ProgramsList[i]._id === match.params.idDoPrograma){
          setValues({ 
            ...values, 
            programa: res.data.data.ProgramsList[i],
            consultouAPI: true
          });
        }
      }

    })
    .catch(function (error) {
      //console.log(error);
    })
  }, []);

  const vaiPokebola = () => {
    console.log('POKEBOLA')
    setValues({
      programa: {},
      consultouAPI: false
    })
    const obj = {
      quantidade :"25",
      pagina: "1",
      ordenar: {
        por:"valor",
        ordem:"asc"
      }
    };
    api.post(`/programs`, obj)
    .then(res => {
      for(let i = 0; i <= res.data.data.ProgramsList.length; i++){
        if(res.data.data.ProgramsList[i]._id === match.params.idDoPrograma){
          setValues({ 
            ...values, 
            programa: res.data.data.ProgramsList[i],
            consultouAPI: true
          });
        }
      }

    })
    .catch(function (error) {
      //console.log(error);
    })
  }

  const PaginaLoad = () => {
    return(
      <p>CARREGANDO</p>
    )
  }

  const carregarPagina = () => {
    if(values.consultouAPI){
      return(
        PaginaCompleta()
      )
    }else{
      return(
        PaginaLoad()
      )
    }
  }

  const PaginaCompleta = () => {
    return(
      <div className="managerDashboardProgram-generalContainer">
        <div className="row">
          <div className="col-md-12">
            <Link to={'/me/painel-da-gestora/programas'}>
             
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
           <Informations programa={values.programa} />
          </div>
          <div className="col-md-7">
            <div className="managerDashboardProgram-actionsGeneralContainer">
              <ActionBox 
                titulo="Visão Geral"
                url={`/me/painel-da-gestora/programas/ver/${match.params.idDoPrograma}`} 
              />
              <ActionBox 
                titulo="Dados do Programa"
                url={'# '}
              />
              <ActionBox 
                titulo="Regras do Programa"
                url={'# '}
              />
              <ActionBox 
                titulo="Víncular Beneficiário"
                url={`/me/painel-da-gestora/programas/ver/${match.params.idDoPrograma}/vincular-beneficiario`} 
              />
            </div>
          </div>
        </div>

        {window.location.pathname === `/me/painel-da-gestora/programas/ver/${match.params.idDoPrograma}` ?
          <>
            <div className="row">
              <div className="col-md-5">
                <TableLatestRegisters vaiPokebola={vaiPokebola} idDoPrograma={match.params.idDoPrograma} />
              </div>
              <div className="col-md-7">
                <TableBenefits />
              </div>
            </div>
          </>
        :
          routes.map((route, index) => <MakeRouteWithSubRoutes key={index} {...route} />)
        }

      </div> 
    )
  }

  return (
    <>
    
      {carregarPagina()}
      
    </>
  );
}