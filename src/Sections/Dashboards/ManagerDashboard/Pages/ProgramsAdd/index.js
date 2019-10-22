import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import './style.css';
import api from './../../../../../Services/api';
import Alert from './../../../../../Components/Alert';

export default function ManagerDashboarProgramsAdd() {
  const [values, setValues] = useState({
    gestoraId: '5d93a0417e87f339288f189b',
    type: '',
    territorialCoverage: '',
    status: '',
    nome: '',
    descricao: '',
    imagem: '',
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
const adicionarNovoPrograma = () =>{
  setValues({ ...values, usandoAPI: false });
    const obj = {
      name: values.nome,
      type: values.type,
      territorialCoverage: values.territorialCoverage,
      photo: values.imagem,
      status: values.status,
      description: values.descricao,
      tags: [
        "emilhaço",
        "fiote"
      ]
  };
  console.log(obj)
  api.post(`program/new`, obj)
      .then(res => {
      console.log(res.data);
      switch (res.data.meta.codigo) {
          case '0004001001':
          default:
            return(
              setValues({ 
                  ...values, 
                  nome: '',
                  descricao: '',
                  imagem: '',
                  mostrarAlerta: true,
                  typeAlerta: 'success',
                  positionAlert: 'top-right',
                  textAlert: 'Programa criado com sucesso.'
              })
          );
        }
      })
      .catch(function (error) {
      console.log(error);
      })
}
//RENDERIZAR ALERTA
const renderAlerta = () => {
  if (values.mostrarAlerta) {
  return <Alert type={values.typeAlerta} position={values.positionAlert} text={values.textAlert} />
  }
}
  return (
    <>
      {renderAlerta()}
      <div className="painelGestoraProgramasAdicionar-containerGeral">
        <Link to={"/me/painel-da-gestora/programas"}>
          <button>Voltar</button>
        </Link>
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="form-group">
                <label className="form-label">Nome do Programa</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="Digite o nome do novo tipo"
                    value={values.nome}
                    onChange={handleChange('nome')}
                />
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="form-group">
                <label className="form-label">Tipo de Programa</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="Digite o tipo do programa"
                    value={values.type}
                    onChange={handleChange('type')}
                />
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="form-group">
                <label className="form-label">territorialCoverage</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="territorialCoverage"
                    value={values.territorialCoverage}
                    onChange={handleChange('territorialCoverage')}
                />
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="form-group">
                <label className="form-label">status</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="status"
                    value={values.status}
                    onChange={handleChange('status')}
                />
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="form-group">
                <label className="form-label">Descrição</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="Digite a descrição"
                    value={values.descricao}
                    onChange={handleChange('descricao')}
                />
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="form-group">
                <label className="form-label">Imagem</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="URL da imagem do Programa"
                    value={values.imagem}
                    onChange={handleChange('imagem')}
                />
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
                <button onClick={() => adicionarNovoPrograma()} className="btn btn-3d btn-3d-primary">Criar Programa</button>
            </div>
          </div>
      </div>
    </>
  );
}