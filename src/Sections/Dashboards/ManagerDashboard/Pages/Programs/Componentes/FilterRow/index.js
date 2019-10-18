import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style.css';

export default function LinhaDeFiltrosDeProgamas() {
  const [values, setValues] = useState({
    userId: '5d93a0417e87f339288f189b',
    search: 'Procurar...',
    select: '',
    servicos: [],
    abaAtiva: '',
    consultouAPI: false
  });
//HANDLE CHANGE
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <>
      <div className="linhaDeFiltrosDosProgramas-containerGeral">
        <div className="linhaDeFiltrosDosProgramas-titulo">
          <h4>Meus Programas</h4>
        </div>
        
        <div className="linhaDeFiltrosDosProgramas-itensNaDireita">
          <Link to={"/me/painel-da-gestora/programas/adicionar"}>
            <button className="btn btn-3d btn-3d-primary">
              <i className="fas fa-plus"></i>
            </button>
          </Link>
          <button className="btn btn-3d btn-3d-primary">
            <i className="far fa-eye"></i>
          </button>
          <button className="btn btn-3d btn-3d-primary">
            <i className="fas fa-sync-alt"></i>
          </button>
          <select 
            className="form-control"
            value={values.select}
            onChange={handleChange('select')}
          >
            <option value="">Filtragem</option>
            <option value="Filtro1">Filtro1</option>
            <option value="Filtro2">Filtro2</option>
          </select>
          <input 
            type="text" 
            className="form-control input-text" 
            placeholder=""
            value={values.search}
            onChange={handleChange('search')}
          />
          <button className="btn btn-3d btn-3d-primary">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </>
  );
}