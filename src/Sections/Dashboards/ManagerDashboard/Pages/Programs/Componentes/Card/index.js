import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

export default function ManagerDashboardProgramsCard(props) {
    console.log(props.programa)
  return (
    <>
        <div className="managerDashboardProgramsCard-containerGeral">
            <div className="managerDashboardProgramsCard-containerGeral-card">
                <div className="managerDashboardProgramsCard-containerGeral-cardBorder"></div>
                <div className="managerDashboardProgramsCard-containerGeral-cardBody">
                    <div className="managerDashboardProgramsCard-containerGeral-cardBodyImageContainer">
                    <div style={{backgroundImage: `url('${props.programa.photo}')`}} className="managerDashboardProgramsCard-containerGeral-cardBodyImage"></div>
                    </div>
                    <div className="managerDashboardProgramsCard-containerGeral-cardBodyInformation">
                        <h3>{props.programa.name}</h3>
                        <p>Beneficiarios no programa: <span>221</span></p>
                        <p>Atividades Desenvolvidas: <span>1.329</span></p>
                        <p>Investimentos no programa: <span>R$ 18.445</span></p>
                    </div>
                </div>
                <div className="managerDashboardProgramsCard-containerGeral-cardFooter">
                <Link to={`/me/painel-da-gestora/programas/ver/${props.programa._id}`}>
                    <button className="btn btn-3d btn-3d-primary">Visualizar</button>
                </Link>
                <Link to={`/me/painel-da-gestora/programas/ver/${props.programa._id}`}>
                    <button className="btn btn-3d btn-3d-primary">Editar Informações</button>
                </Link>
                <Link to={`/me/painel-da-gestora/programas/ver/${props.programa._id}`}>
                    <button className="btn btn-3d btn-3d-primary">Editar Regras</button>
                </Link>
                </div>
            </div>
        </div>
    </>
  );
}