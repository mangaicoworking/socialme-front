import React, { useState, useEffect } from "react";
import './style.css';
import api from './../../../../../../../../../Services/api';
import TabelaResponsiva from './../../../../../../../../../Components/TabelaResponsiva';

export default function PainelGestoraTiposDeAtividadesAdicionar() {
    const [values, setValues] = useState({
        gestoraId: '5d93a0417e87f339288f189b',
        tiposDeAtividades: [],
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
    api.post(`/tiposDeAtividade/${values.gestoraId}`, obj)
    .then(res => {
      console.log(res.data);
      setValues({ 
        ...values, 
        tiposDeAtividades: res.data.tiposDeAtividade,
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
//PREENCHENDO A TABELA
    const valoresParaPreencherHeadDaTabela = [
        "", "Nome", "Descrição", "Grupo"
      ]
    const preencherNaTabela = () => {
        if(values.consultouAPI){
            return(
                values.tiposDeAtividades.map((item, index) => 
                    <tr key={index}>
                    <td className="tdContainerImagem">
                        <img src={`/assets/icones/outros/check-list.svg`} alt={'item.imagem.descricao'} />
                    </td>
                    <td>
                        <p style={{color: 'var(--primary)'}}>{capitalizeFirstLetter(item.nome)}</p>
                    </td> 
                    <td>{item.descricao}</td>
                    <td>tags</td>
                    <td>
                        <i className="fas fa-ellipsis-h"></i>
                    </td>
                    </tr>
                )
            )
        }
    }
//ADICIONANDO
    const adicionandoNovoTipo = () =>{
        api.get(`novoTipoDeAtividade/${values.gestoraId}`)
            .then(res => {
            console.log(res.data);
            switch (res.data.meta.codigo) {
                case '0002001001':
                default:
                  return(
                    setValues({ 
                        ...values, 
                        nome: '',
                        descricao: '',
                        tags: '',
                        mostrarAlerta: true,
                        typeAlerta: 'success',
                        positionAlert: 'top-right',
                        textAlert: 'Tipo de Atividade criado com sucesso.'
                    })
                );
              }
            })
            .catch(function (error) {
            console.log(error);
            })
    }

  return (
    <>
        <div className="painelGestoraGestorDeBeneficiosAtividadesVisualizar-containerGeral">
            <div className="painelGestoraGestorDeBeneficios-RowFiltros">
                <div className="itensLeft">
                    <button className="btn btn-3d btn-3d-primary">
                    <i className="far fa-save"></i>
                    </button>
                    <button className="btn btn-3d btn-3d-primary">
                    <i className="fas fa-download"></i>
                    </button>
                    <button className="btn btn-3d btn-3d-primary">
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
                    <button className="btn btn-3d btn-3d-primary">
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