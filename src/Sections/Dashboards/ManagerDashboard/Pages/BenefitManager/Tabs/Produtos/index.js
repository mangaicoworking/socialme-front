import React, { useState, useEffect } from "react";
import api from './../../../../../../../Services/api';
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
    api.post(`/produtos/${values.userId}`, obj)
    .then(res => {
      console.log(res.data);
      setValues({ 
        ...values, 
        produtos: res.data.produtos,
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
              <img src={`/assets/icones/produtos/${item.imagem.url}.svg`} alt={item.imagem.descricao} />
            </td>
            <td>
              <p style={{color: 'var(--primary)'}}>{capitalizeFirstLetter(item.nome)}</p>
              <span style={{fontSize: '8pt'}}>NCM: {item.ncm}</span>
            </td> 
            <td>R${item.valor}</td>
            <td>tags</td>
            <td>{capitalizeFirstLetter(item.descricao)}</td>
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