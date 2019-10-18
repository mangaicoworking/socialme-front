import React, { useState } from "react";
import './style.css';
import api from './../../../../../../../../../Services/api';
import Alert from './../../../../../../../../../Components/Alert';

export default function PainelGestoraTiposDeAtividadesAdicionar() {
  const [values, setValues] = useState({
    gestoraId: '5d93a0417e87f339288f189b',
    abaAtiva: '',
    nome: '',
    descricao: '',
    tags: '',
    usandoAPI: false,
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
            descricao: values.descricao
        };
        api.post(`novoTipoDeAtividade/${values.gestoraId}`,obj)
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
                <label className="form-label">Nome do Novo Tipo de Atividade</label>
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
                <label className="form-label">Tags</label>
                <input 
                    type="text" 
                    className="form-control input-text" 
                    placeholder="Digite as tags do tipo de atividade"
                    value={values.tags}
                    onChange={handleChange('tags')}
                />
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