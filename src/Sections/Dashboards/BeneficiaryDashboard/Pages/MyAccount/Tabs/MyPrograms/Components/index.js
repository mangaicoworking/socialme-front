import React, { useState, useEffect, useContext } from "react";
import './style.css';
import OnlyLine from './Components/OnlyLine';
import api from './../../../../../../../Services/api';
import { AuthContext } from './../../../../../../../Contexts/AuthContext';
import { isMetaProperty } from "@babel/types";

const dataFake = [
  {
    "name" : 'Programa do Gugu',
    "image" : {
      "url" : "alvo",
      "description" : "Descrição da Imagem do Programa"
    },
    "status" : false,
    "requester" : "Prefeitura de Boa Vista"
  },
  {
    "name" : 'Programa do Faustão',
    "image" : {
      "url" : "alvo",
      "description" : "Descrição da Imagem do Programa"
    },
    "status" : true,
    "data" : "1992-01-01"
  }
]

export default function BeneficiaryDashboardMyAccountMyPrograms() {
  const { person } = useContext(AuthContext);
  const [values, setValues] = useState({
    gestoraId: '5d93a0417e87f339288f189b',
    programas: [],
    consultouAPI: false
  });
//PEGA DADOS DA PESSOA DA API
  useEffect(() => {
    if(person !== undefined){
      listarProgramas()
    }
  }, []);
  const vaiPokebola = () => {
    console.log('POKEBOLA')
    listarProgramas()
  }
//CONSULTANDO PROGRAMAS
  const listarProgramas = () =>{
    console.log('Listando')
    const obj = {
      personId: person._id 
    };
    api.post(`programs/person`,obj)
    .then(res => {
        console.log(res.data)
        setValues({ 
          ...values,
            programas: res.data.data.ProgramPeopleList
        })
    })
    .catch(function (error) {
    console.log(error);
    })
    
    /*
    const obj = {
        dados : {
            nome : 'ARTHUR GERÔNIMO',
            cpf : '33333333333',
            nascimento : {
                data: '1992-01-01'
            }
        },
        campos: [
          "programas"
        ]
    };
    api.post(`pessoa/pesquisar`,obj)
    .then(res => {
        console.log(res.data)
    switch (res.data.meta.codigo) {
        default:
        return(
            setValues({ 
            ...values,
            encontrouAlguem: false,
            erroNaBusca: false,
            })
        );
        case '0001003101':
        return(
            setValues({ 
            ...values,
            encontrouAlguem: false,
            erroNaBusca: true,
            })
        );
        case '0001003100':
        return(
            setValues({ 
            ...values,
              programas: res.data.pessoa.programas
            })
        );
    }
    })
    .catch(function (error) {
    console.log(error);
    })
    */
}
  return (
    <>
      <div className="beneficiaryDashboardMyAccountMyPrograms-generalContainer">
        <div className="row">
          <div className="col-md-12">
            <h3>Meus Programas</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4>Programas Pendentes</h4>
          </div>
          <ul className="beneficiaryDashboardMyAccountMyPrograms-ul">
            {
              values.programas.map((item, index) => 
                (item.person.approvalStatus ?
                  <></>
                  :
                  <OnlyLine 
                  key={item.program._id} 
                  nomeInstituicao={item.institution.institution.profile.fantasyName} 
                  personId={person._id} item={item.program} 
                  status={'Pendente'} 
                  vaiPokebola = {vaiPokebola}
                  />
                )
              )
            }
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4>Programas Com Solicitação Pendente</h4>
          </div>
          <ul className="beneficiaryDashboardMyAccountMyPrograms-ul">
            {
              values.programas.map((item, index) => 
                (item.institution.approvalStatus ?
                  <></>
                  :
                  <OnlyLine 
                  key={item.program._id} 
                  nomeInstituicao={item.institution.institution.profile.fantasyName} 
                  personId={person._id} item={item.program} 
                  status={'ComSolicitacoesPendentes'}
                  vaiPokebola = {vaiPokebola}
                  />
                )
              )
            }
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4>Programas Que Participo</h4>
          </div>
          <ul className="beneficiaryDashboardMyAccountMyPrograms-ul">
            {
              values.programas.map((item, index) => 
                (item.institution.approvalStatus && item.person.approvalStatus ?
                  <OnlyLine 
                  key={item.program._id} 
                  nomeInstituicao={item.institution.institution.profile.fantasyName} 
                  personId={person._id} item={item.program} 
                  status={'Dentro'} 
                  vaiPokebola = {vaiPokebola}
                  />
                  :
                  <></>
                )
              )
            }
          </ul>
        </div>
      </div>
    </>
  );
}