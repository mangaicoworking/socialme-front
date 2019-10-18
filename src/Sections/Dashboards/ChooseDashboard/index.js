import React from 'react';
import { Link } from "react-router-dom";

/* 
  Mostra quais opções de Dashboards o usuário pode entrar
*/

export default function ChooseDashboard() {
  console.log('Choose Dashboard')
  return (
    <>
      <div className="content-generic">
        <Link to={`/painel-da-gestora`}>
          Painel Gestora
        </Link>
      </div>
    </>
  );
}