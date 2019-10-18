import React, { useState, useEffect } from "react";
import api from './../../../../../../../Services/api';
import './style.css';
import Alert from './../../../../../../../Components/Alert';
import ImagemUser from './../../../../../../../Assets/Images/user.png'

export default function PainelGestoraProgramasBoxVincula(props) {
    const [values, setValues] = useState({
        gestoraId: '5d93a0417e87f339288f189b',
        nome: '',
        cpf: '',
        nascimento: '',
        encontrouAlguem: false,
        nomeEncontrado: '',
        idEncontrado: '',
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
//RENDERIZAR ALERTA
const renderAlerta = () => {
    if (values.mostrarAlerta) {
    return <Alert type={values.typeAlerta} position={values.positionAlert} text={values.textAlert} />
    }
}
const renderizaSeEncontrouAlguem = () => {
    if(values.encontrouAlguem){
        return(
            <>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <img src={ImagemUser} alt="Imagem do Usuário" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <span>Nome da Pessoa</span>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <button className="btn btn-3d btn-3d-primary">
                        Cancelar
                        </button>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <button className="btn btn-3d btn-3d-primary btn-vincula">
                        Vincular
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
  return (
    <>
        {renderAlerta()}
        <div className={"cardProgramaIsometric-vincularBeneficiario "+(props.aberto ? 'cardProgramaIsometric-vincularBeneficiario-open' : '')}>
                <p>Vincular Beneficiário</p>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                    <label className="form-label">Nome</label>
                    <input 
                        type="text" 
                        className="form-control input-text" 
                        placeholder="Nome"
                        value={values.nome}
                        onChange={handleChange('nome')}
                    />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                    <label className="form-label">CPF</label>
                    <input 
                        type="text" 
                        className="form-control input-text" 
                        placeholder="CPF"
                        value={values.cpf}
                        onChange={handleChange('cpf')}
                    />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                    <label className="form-label">Nascimento</label>
                    <input 
                        type="text" 
                        className="form-control input-text" 
                        placeholder="Nascimento"
                        value={values.nascimento}
                        onChange={handleChange('nascimento')}
                    />
                    </div>
                </div>
                {renderizaSeEncontrouAlguem()}
        </div>
    </>
  );
}