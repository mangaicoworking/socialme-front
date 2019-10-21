import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { DebugContext } from './../../../Contexts/DebugContext';
import { AuthContext } from './../../../Contexts/AuthContext';

/* 
  Mostra quais opções de Dashboards o usuário pode entrar
*/

export default function ChooseDashboard() {
  const { DebugConsole } = useContext(DebugContext);
  const { person, institution } = useContext(AuthContext);
  console.log(person);
  console.log(institution)

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