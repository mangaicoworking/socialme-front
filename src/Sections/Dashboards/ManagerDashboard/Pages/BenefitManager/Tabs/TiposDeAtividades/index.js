import React, { useState, useEffect } from "react";
import './style.css';
import AbaAdicionar from './Abas/AdicionarUmNovoTipo';
import AbaVisualizar from './Abas/VisualizarTodosOsTipos';

export default function PainelGestoraTiposDeAtividades() {
  const [values, setValues] = useState({
    abaAtiva: 'Visualizar Todas'
  });

  const ativaAlgumaAba = (abaClicada) => {
    setValues({ ...values, abaAtiva: abaClicada });
  }

  const renderizarAbaAtiva = () => {
    switch (values.abaAtiva) {
      case 'Visualizar Todos os Tipos de Atividades':
      default:
        return <AbaVisualizar />;
      case 'Adicionar Novo Tipo de Atividade':
        return <AbaAdicionar />;
    }
  }

  return (
    <>
      <div className="painelGestoraGestorDeBeneficiosTiposDeAtividades-containerGeral">
          <div className="col-md-12">
            <button onClick={() => ativaAlgumaAba('Visualizar Todos os Tipos de Atividades')} className="btn btn-3d btn-3d-primary">Visualizar Todos os Tipos de Atividades</button>
            <button onClick={() => ativaAlgumaAba('Adicionar Novo Tipo de Atividade')} className="btn btn-3d btn-3d-primary">Adicionar Novo Tipo de Atividade</button>
          </div>
          <div className="col-md-12">
            {renderizarAbaAtiva()}
          </div>
      </div>
    </>
  );
}