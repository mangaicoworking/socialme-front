import React from 'react';
import './style.css';
import Moment from 'react-moment';
import api from './../../../../../../../../../Services/api';

export default function BeneficiaryDashboardMyAccountMyProgramsOnlyLine(props) {
    console.log('PROPS -> ', props)
    const aceitarSolicitacao = () => {
        console.log('ACEITOU A SOLICITAÇÃO')
        const obj = {
            personId: props.personId,
            programId: props.item._id
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
    const rejeitarSolicitacao = () => {
        console.log('REJEITOU A SOLICITAÇÃO')
        const obj = {
            personId: props.personId,
            programId: props.item._id
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
        <li className="beneficiaryDashboardMyAccountMyPrograms-li">
            <div className="col-md-1">
                <div className="beneficiaryDashboardMyAccountMyPrograms-imageProgramContainer">
                <div style={{backgroundImage: `url('${props.item.photo})`}} className="beneficiaryDashboardMyAccountMyPrograms-imageProgram"></div>
                </div> 
            </div>
            <div className="col-md-5">
                <div className="beneficiaryDashboardMyAccountMyPrograms-nameProgram">
                    <p>{props.item.name}</p>

                    {props.status === 'Pendente' ?
                        <span>Você foi convidada por {props.nomeInstituicao}</span>
                    :
                        <></>
                    }

                    {props.status === 'ComSolicitacoesPendentes' ?
                       <span>Você solicitou entrada há XX dias para a {props.nomeInstituicao} </span>
                    :
                        <></>
                    }

                    {props.status === 'Dentro' ?
                        //<span>Entrou no programa <Moment fromNow>{props.item.dataIngresso}</Moment></span>
                        <span>Entrou no programa há XX dias </span>
                    :
                        <></>
                    }

                </div>
            </div>
            <div className="col-md-6">
                <div className="beneficiaryDashboardMyAccountMyPrograms-actions">

                {props.status === 'Pendente' ? 
                    <div className="beneficiaryDashboardMyAccountMyPrograms-actions-pending">
                        <button onClick={() => rejeitarSolicitacao()} className="btn btn-3d btn-3d-secondary">Rejeitar</button>
                        <button onClick={() => aceitarSolicitacao()} className="btn btn-3d btn-3d-primary">Aceitar</button>
                    </div>
                :
                    <></>
                }
                {props.status === 'ComSolicitacoesPendentes' ? 
                    <div className="beneficiaryDashboardMyAccountMyPrograms-actions-pending">
                        <button onClick={() => props.vaiPokebola()} className="btn btn-3d btn-3d-secondary">Cancelar Solicitação</button>
                    </div>
                :
                    <></>
                }
                {props.status === 'Dentro' ? 
                    <button onClick={() => props.vaiPokebola()} className="btn btn-3d btn-3d-primary">Mais Detalhes</button>
                :
                    <></>
                }

                    
                </div>
            </div>
        </li>
    </>
  );
}