import React, { useState, useEffect, useContext } from "react";
import './style.css';
import api from './../../../../../../../Services/api';
import UnicaLinha from './Components/UnicaLinha';
import { AuthContext } from './../../../../../../../Contexts/AuthContext';


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
  }, [person]);
  const vaiPokebola = () => {
    listarProgramas()
  }
//CONSULTANDO PROGRAMAS
  const listarProgramas = () =>{
    console.log('Listando')
    const obj = {
      personId: person._id 
    };
    api.post(`person/programs/available`,obj)
    .then(res => {
        console.log(res.data)
        setValues({ 
          ...values,
            programas: res.data.data.ProgramsList
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
            <h3>Programas que posso participar</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ul>

              {values.programas.map((item, index) =>
                <UnicaLinha key={index} program={item} personId={person._id} />
              )}
              
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}