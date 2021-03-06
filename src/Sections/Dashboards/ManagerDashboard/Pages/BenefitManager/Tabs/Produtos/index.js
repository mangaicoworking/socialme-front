import React, { useState, useEffect } from "react";
import api from './../../../../../../../Services/api';
import axios from 'axios';
import TabelaResponsiva from './../../../../../../../Components/TabelaResponsiva';

export default function PainelGestoraProdutos() {
  const [values, setValues] = useState({
    userId: '5d93a0417e87f339288f189b',
    search: 'Procurar...',
    select: '',
    produtos: [],
    consultouAPI: false
  });
//HANDLE CHANGE
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
//PEGA DADOS DA PESSOA DA API
  useEffect(() => {
    const obj = {
      quantidade :"25",
      pagina: "1",
      ordenar: {
        por:"valor",
        ordem:"asc"
      }
    };
    //api.post(`/products`, obj)
    axios({
      baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
      headers: {'mundo-data-token': localStorage.getItem('token')},
      method: 'post',
      url: '/products',
      data: {
        quantidade :"25",
        pagina: "1",
        ordenar: {
          por:"valor",
          ordem:"asc"
        }
      }
    })
    .then(res => {
      console.log(res.data);
      setValues({ 
        ...values, 
        produtos: res.data.data.ProductsList,
        consultouAPI: true
      });
    })
    .catch(function (error) {
        console.log(error);
    })
  }, []);

  //CAPITALIZE
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const valoresParaPreencherHeadDaTabela = [
    "", "Nome", "Valor", "Grupo", "Descrição", ""
  ]

  const preencherNaTabela = () => {
    if(values.consultouAPI){
      return(
          values.produtos.map((item, index) => 
          <tr key={index}>
            <td className="tdContainerImagem">
              <img src={item.photo} alt="Descrição" />
            </td>
            <td>
              <p style={{color: 'var(--primary)'}}>{capitalizeFirstLetter(item.name)}</p>
              <span style={{fontSize: '8pt'}}>NCM: {item.codes[0].number}</span>
            </td> 
            <td>R$00,00</td>
            <td>tags</td>
            <td>Descrição</td>
            <td>
                <i className="fas fa-ellipsis-h"></i>
            </td>
          </tr>
        )
      )
    }
  }

  return (
    <>
      <div className="painelGestoraGestorDeBeneficios-containerGeral">
        <div className="painelGestoraGestorDeBeneficios-RowFiltros">
          <div className="itensLeft">
            <button className="btn btn-outline-primary">
              <i className="far fa-save"></i>
            </button>
            <button className="btn btn-outline-primary">
              <i className="fas fa-download"></i>
            </button>
            <button className="btn btn-outline-primary">
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div className="itensRight">
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
            <button className="btn btn-outline-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <TabelaResponsiva 
          head={valoresParaPreencherHeadDaTabela}
          registros={preencherNaTabela()}
        />
      </div>
    </>
  );
}