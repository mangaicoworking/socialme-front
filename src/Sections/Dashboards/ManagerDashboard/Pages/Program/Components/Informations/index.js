import React from 'react';
import './style.css';

export default function ManagerDashboardProgram(props) {
  return (
    <>
        <div className="managerDashboardProgram-informations-generalContainer">
            <div className="managerDashboardProgram-informations-imageContainer">
            <div style={{backgroundImage: `url('${props.programa.imagem.url}')`}} className="managerDashboardProgram-informations-image"></div>
            </div>
            <div className="managerDashboardProgram-informations-informations">
            <h3>{props.programa.nome}</h3>
            <p>Beneficiarios no programa: <span>221</span></p>
            <p>Atividades Desenvolvidas: <span>1.329</span></p>
            <p>Investimentos no programa: <span>R$ 18.445</span></p>
            </div>
        </div>
    </>
  );
}