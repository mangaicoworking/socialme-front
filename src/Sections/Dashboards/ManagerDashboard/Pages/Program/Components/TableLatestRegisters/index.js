import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import './style.css';
import TableResponsive from './../../../../../../../Components/TabelaResponsiva';
import api from './../../../../../../../Services/api';

export default function ManagerDashboardProgramTableLatestRegisters(props) {
  const [values, setValues] = useState({
    beneficiariosDoPrograma: [],
    consultouAPI: false
  });
//PEGA DADOS DA PESSOA DA API
  useEffect(() => {
    const obj = {
      quantidade : 25,
      pagina: 1,
    };
    api.post(`programas/beneficiarios/${props.idDoPrograma}`, obj)
    .then(res => {
      console.log(res.data);
      setValues({ 
        ...values, 
        beneficiariosDoPrograma: res.data.rel,
        consultouAPI: true 
      });
    })
    .catch(function (error) {
        console.log(error);
    })
  },[]);
//CAPITALIZE
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const valoresParaPreencherHeadDaTabela = [
    "", "Nome", "Data"
  ]
  const preencherNaTabela = () => {
    if(values.consultouAPI){
      return(
          values.beneficiariosDoPrograma.map((item, index) => 
          <tr key={index}>
            <td className="tdContainerImagem">
              <img src={`/assets/icones/outros/user.svg`} alt={'Foto do Usuário'} />
            </td>
            <td>
              <p style={{color: 'var(--primary)'}}>{capitalizeFirstLetter(item.nome)}</p>
            </td> 
            <td>
              {item.status ?
                <Moment format="DD/MM/YYYY">{item.dataDeIngresso}</Moment>
              :
                <p>(Pendente)</p>
              }
            </td>
              
          </tr>
        )
      )
    }
  }
  return (
    <>
      <div className="managerDashboardProgramTableLatestRegisters-generalContainer">
        <TableResponsive 
          head={valoresParaPreencherHeadDaTabela}
          registros={preencherNaTabela()}
        />
      </div>
    </>
  );
}