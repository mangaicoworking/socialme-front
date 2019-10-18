import React, { useState, useEffect } from "react";
import './style.css';
import OnlyLine from './Components/OnlyLine';
import api from './../../../../../../../Services/api';

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
  const [values, setValues] = useState({
    gestoraId: '5d93a0417e87f339288f189b',
    programas: [],
    consultouAPI: false
  });
//PEGA DADOS DA PESSOA DA API
  useEffect(() => {
    procurarBeneficiario()
  }, []);
//CONSULTANDO PROGRAMAS
  const procurarBeneficiario = () =>{
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
}
  return (
    <>
      <div className="beneficiaryDashboardMyAccountMyPrograms-generalContainer">
        <div className="row">
          <div className="col-md-12">
            <h3>Meus Programas</h3>
          </div>
        </div>
        <ul className="beneficiaryDashboardMyAccountMyPrograms-ul">
          
          {
            values.programas.map((item, index) => 
              <OnlyLine key={index} item={item} imagem={"https://i.ytimg.com/vi/UdkXxnL-vUw/hqdefault.jpg"}/>
            )
          }

        </ul>
      </div>
    </>
  );
}