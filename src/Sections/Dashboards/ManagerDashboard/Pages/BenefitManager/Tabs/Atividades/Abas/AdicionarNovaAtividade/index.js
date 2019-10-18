import React, { useState, useEffect } from "react";
import './style.css';
import api from './../../../../../../../../../Services/api';
import Alert from './../../../../../../../../../Components/Alert';

export default function PainelGestoraGestoraDeBeneficiosAtividadesAdicionar() {
  const [values, setValues] = useState({
    gestoraId: '5d93a0417e87f339288f189b',
    abaAtiva: '',
    nome: '',
    idTipoDeAtividade: '',
    todosOsTiposDeAtividades: [],
    //Alerta
    mostrarAlerta: false,
    typeAlerta: 'success',
    positionAlert: 'top-right',
    textAlert: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium est sit amet erat egestas vulputate.'
  });
//HANDLE CHANGE
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
//ADICIONANDO
    const adicionandoNovoTipo = () =>{
        setValues({ ...values, usandoAPI: false });
            const obj = {
            nome: values.nome,
            _idTipoDeAtividade: values.idTipoDeAtividade
        };
        api.post(`novaAtividade/${values.gestoraId}`,obj)
            .then(res => {
            console.log(res.data);
            switch (res.data.meta.codigo) {
                case '0003001001':
                default:
                  return(
                    setValues({ 
                        ...values, 
                        nome: '',
                        idTipoDeAtividade: '',
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
//PEGA DADOS DA PESSOA DA API
useEffect(() => {
  const obj = {
    quantidade :"100",
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
      todosOsTiposDeAtividades: res.data.tiposDeAtividade,
      consultouAPI: true
    });
  })
  .catch(function (error) {
      console.log(error);
  })
}, []);
//RENDERIZAR ALERTA
  const renderAlerta = () => {
      if (values.mostrarAlerta) {
      return <Alert type={values.typeAlerta} position={values.positionAlert} text={values.textAlert} />
      }
  }

  return (
    <>
        {renderAlerta()}
        <div className="painelGestoraGestorDeBeneficiosAtividadesAdicionar-containerGeral">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="form-group">
                <label className="form-label">Nome da Atividade</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="Digite o nome da nova atividade"
                    value={values.nome}
                    onChange={handleChange('nome')}
                />
                </div>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label className="form-label">Tipo De Atividade</label>
                <select 
                  className="form-control"
                  value={values.idTipoDeAtividade}
                  onChange={handleChange('idTipoDeAtividade')}
                >
                  <option value="">Selecione...</option>
                  {values.todosOsTiposDeAtividades.map((item, index) => 
                    <option key={index} value={item._id}>{item.nome}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
                <button onClick={() => adicionandoNovoTipo()} className="btn btn-3d btn-3d-primary">Criar</button>
            </div>
          </div>
      </div>
    </>
  );
}