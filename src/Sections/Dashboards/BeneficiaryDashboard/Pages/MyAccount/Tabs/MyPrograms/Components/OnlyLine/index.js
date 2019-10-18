import React from 'react';
import './style.css';
import Moment from 'react-moment';

export default function BeneficiaryDashboardMyAccountMyProgramsOnlyLine(props) {
  return (
    <>
        <li className="beneficiaryDashboardMyAccountMyPrograms-li">
            <div className="col-md-1">
                <div className="beneficiaryDashboardMyAccountMyPrograms-imageProgramContainer">
                <div style={{backgroundImage: `url('/assets/imagens/${props.item._id}.jpg')`}} className="beneficiaryDashboardMyAccountMyPrograms-imageProgram"></div>
                </div> 
            </div>
            <div className="col-md-5">
                <div className="beneficiaryDashboardMyAccountMyPrograms-nameProgram">
                    <p>{props.item.nomePrograma}</p>

                    {props.item.status ?
                        <span>Entrou no programa <Moment fromNow>{props.item.dataIngresso}</Moment></span>
                    :
                        <span>Você foi convidada por Prefeitura de Boa Vista</span>
                    }

                </div>
            </div>
            <div className="col-md-6">
                <div className="beneficiaryDashboardMyAccountMyPrograms-actions">

                {props.item.status ? 
                    <button className="btn btn-3d btn-3d-primary">Mais Detalhes</button>
                :
                    <>
                        <div className="beneficiaryDashboardMyAccountMyPrograms-actions-pending">
                            <button className="btn btn-3d btn-3d-secondary">Rejeitar</button>
                            <button className="btn btn-3d btn-3d-primary">Aceitar</button>
                        </div>   
                    </>
                    
                }

                    
                </div>
            </div>
        </li>
    </>
  );
}