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
      programId: props.idDoPrograma
    };
    api.post(`program/people`, obj)
    .then(res => {
      console.log('program/peolpe -> ', res.data);
      setValues({ 
        ...values, 
        beneficiariosDoPrograma: res.data.data.ProgramPeopleList,
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
              <img src={item.person.person.profile.photo} alt={'Foto do Usuário'} />
            </td>
            <td>
              <p style={{color: 'var(--primary)'}}>{capitalizeFirstLetter(item.person.person.profile.name)}</p>
            </td> 
            <td>

              {item.institution.approvalStatus && item.person.approvalStatus === false ?
                <p>(Pendente)</p>
              :
                <></>
              }

              {item.institution.approvalStatus && item.person.approvalStatus ?
                <Moment format="DD/MM/YYYY">{item.dataDeIngresso}</Moment>
              :
                <></>
              }

              {item.institution.approvalStatus === false && item.person.approvalStatus ?
                <div className="tabelaAceitarOuRejeitarSolicitacoes">
                  <button onClick={() => rejeitarSolicitacao(item.person.person._id)} className="btn btn-3d btn-3d-secondary recusar">
                    <i className="fas fa-times"></i>
                  </button>
                  <button onClick={() => aceitarSolicitacao(item.person.person._id)} className="btn btn-3d btn-3d-primary aceitar">
                    <i className="fas fa-check"></i>
                  </button>
                </div> 
              :
                <></>
              }
              
            </td>
              
          </tr>
        )
      )
    }
  }
  const aceitarSolicitacao = (idDaPessoa) => {
    console.log('ACEITOU A SOLICITAÇÃO')
    const obj = {
        personId: idDaPessoa,
        programId: props.idDoPrograma
    };
    console.log(obj);
    api.post(`program/entrance/confirm`,obj)
    .then(res => {
        console.log(res.data)
        switch(res.data.header.code){
            case '78E3F6325509C44':
                return (
                    console.log('VAI'),
                    props.vaiPokebola()
                ) 
            default:
                return;
        }
    })
    .catch(function (error) {
    console.log(error);
    })
}
const rejeitarSolicitacao = (idDaPessoa) => {
    console.log('REJEITOU A SOLICITAÇÃO')
    const obj = {
        personId: idDaPessoa,
        programId: props.idDoPrograma
    };
    console.log(obj);
    
    api.post(`program/entrance/reject`,obj)
    .then(res => {
        console.log(res.data)
        props.vaiPokebola()
    })
    .catch(function (error) {
    console.log(error);
    })
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