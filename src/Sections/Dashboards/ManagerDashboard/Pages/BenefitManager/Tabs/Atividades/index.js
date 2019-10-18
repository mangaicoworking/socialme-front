import React, { useState, useEffect } from "react";
import './style.css';
import AbaAdicionar from './Abas/AdicionarNovaAtividade';
import AbaVisualizar from './Abas/VisualizarAtividades';

export default function PainelGestoraTiposDeAtividades() {
  const [values, setValues] = useState({
    abaAtiva: 'Adicionar Nova Atividade'
  });

  const ativaAlgumaAba = (abaClicada) => {
    setValues({ ...values, abaAtiva: abaClicada });
  }

  const renderizarAbaAtiva = () => {
    switch (values.abaAtiva) {
      case 'Visualizar Todas':
      default:
        return <AbaVisualizar />;
      case 'Adicionar Nova Atividade':
        return <AbaAdicionar />;
    }
  }

  return (
    <>
      <div className="painelGestoraGestorDeBeneficiosTiposDeAtividades-containerGeral">
          <div className="col-md-12">
            <button onClick={() => ativaAlgumaAba('Visualizar Todas')} className="btn btn-3d btn-3d-primary">Visualizar Atividades</button>
            <button onClick={() => ativaAlgumaAba('Adicionar Nova Atividade')} className="btn btn-3d btn-3d-primary">Adicionar Atividade</button>
          </div>
          <div className="col-md-12">
            {renderizarAbaAtiva()}
          </div>
      </div>
    </>
  );
}