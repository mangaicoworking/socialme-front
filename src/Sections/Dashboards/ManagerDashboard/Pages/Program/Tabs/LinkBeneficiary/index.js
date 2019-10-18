import React, { useState, useEffect } from "react";
import './style.css';
import api from './../../../../../../../Services/api';
import Alert from './../../../../../../../Components/Alert';
import Moment from 'react-moment';

//NOME: ARTHUR GERONIMO
//CPF: 33333333333
//NASCIMENTO: 1992-01-01

export default function ManagerDashboardProgramsProgramLinkBeneficiary({match}) {
    const [values, setValues] = useState({
        gestoraId: '5d93a0417e87f339288f189b',
        nome: '',
        cpf: '',
        nascimento: '',
        idDaPessoaEncontrada: '',
        nomeDaPessoaEncontrada: '',
        cpfDaPessoaEncontrada: '',
        nascimentoDaPessoaEncontrada: '',
        encontrouAlguem: false,
        erroNaBusca: false,
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
//CONSULTANDO ALGUÉM
    const procurarBeneficiario = () =>{
        const obj = {
            dados : {
                nome : values.nome,
                cpf : values.cpf,
                nascimento : {
                    data: values.nascimento
                }
            }
        };
        api.post(`pessoa/pesquisar`,obj)
        .then(res => {
            console.log(res.data)
        switch (res.data.meta.codigo) {
            default:
            return(
                setValues({ 
                ...values,
                encontrouAlguem: false,
                erroNaBusca: false,
                })
            );
            case '0001003101':
            return(
                setValues({ 
                ...values,
                encontrouAlguem: false,
                erroNaBusca: true,
                })
            );
            case '0001003100':
            return(
                setValues({ 
                ...values,
                encontrouAlguem: true,
                erroNaBusca: false,
                idDaPessoaEncontrada: res.data.pessoa._id,
                nomeDaPessoaEncontrada: res.data.pessoa.dados.nome,
                cpfDaPessoaEncontrada: res.data.pessoa.dados.cpf,
                nascimentoDaPessoaEncontrada: res.data.pessoa.dados.nascimento.data,
                })
            );
        }
        })
        .catch(function (error) {
        console.log(error);
        })
    }
//CANCELANDO
    const cancelandoBusca = () => {
        setValues({ 
            ...values,
            nome: '',
            cpf: '',
            nascimento: '',
            idDaPessoaEncontrada: '',
            encontrouAlguem: false,
            erroNaBusca: false,
        })
    }
//VINCULADO BENEFICIÁRIO
const vincularBeneficiario = () =>{
    const obj = {
        _idPessoa: values.idDaPessoaEncontrada,
        _idPrograma: match.params.idDoPrograma,
        _idSolicitante: values.gestoraId
    };
    console.log(obj);
    api.post(`programas/novoBeneficiario`,obj)
    .then(res => {
    console.log(res.data)
    switch (res.data.meta.verboso) {
        default:
        return(
            setValues({ 
            ...values,
            mostrarAlerta: false,
            typeAlerta: 'danger',
            positionAlert: 'top-right',
            textAlert: 'Não foi possível víncular o Beneficiário'
            })
        );
        case 'PROGRAMA > VINCULARPESSOAAPROGRAMA > SUCESSO':
        return(
            setValues({ 
            ...values,
            nome: '',
            cpf: '',
            nascimento: '',
            idDaPessoaEncontrada: '',
            encontrouAlguem: false,
            erroNaBusca: false,
            mostrarAlerta: false,
            typeAlerta: 'success',
            positionAlert: 'top-right',
            textAlert: 'Pessoa vinculada com sucesso'
            })
        );
    }
    })
    .catch(function (error) {
    console.log(error);
    })
}
//FEEDBACK DA BUSCA
const feedbackDaBusca = () => {
    if(values.encontrouAlguem){
        return(
            <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundGeneralContainer">
                <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundSuccess">
                    <img src={`/assets/icones/outros/user.svg`} alt="Foto da Pessoa" />
                    <p>{values.nomeDaPessoaEncontrada}</p>
                    <span>{values.cpfDaPessoaEncontrada}</span><br/>
                    <span><Moment format="DD/MM/YYYY" add={{ hours: 4 }}>{values.nascimentoDaPessoaEncontrada}</Moment></span> 
                    <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundButtons">
                        <button onClick={() => cancelandoBusca()} className="btn btn-3d btn-3d-secondary">Cancelar</button>
                        <button onClick={() => vincularBeneficiario()} className="btn btn-3d btn-3d-primary">Víncular ao Programa</button>
                    </div>
                </div>
            </div>
        )
    }else if(values.erroNaBusca){
        return(
            <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundGeneralContainer">
                <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundError">
                    <img src={`/assets/icones/outros/carinhaTriste.svg`} alt="Carinha Triste" />
                    <h4>Beneficiário não encontrado no nosso sistema.</h4>
                </div>
            </div>
        )
    }else{
        return(
            <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundGeneralContainer">
                <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundDefault">
                    <h4>Coloque as informações ao lado e procure o beneficiário no nosso sistema.</h4>
                </div>
            </div>
        )
    }
}
  return (
    <>
        <div className="managerDashboardProgramsProgramLinkBeneficiary-generalContainer">
            <h1>Víncular</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="managerDashboardProgramsProgramLinkBeneficiary-cardSearchGeneralContainer">
                        <div className="form-group">
                            <label className="form-label">Nome do Beneficiário</label>
                            <input 
                            type="text" 
                            className="form-control input-text" 
                            placeholder="Ex: Maria José da Silva"
                            value={values.nome}
                            onChange={handleChange('nome')}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">CPF do Beneficiário</label>
                            <input 
                            type="text" 
                            className="form-control input-text" 
                            placeholder="Ex: 000.000.000-00"
                            value={values.cpf}
                            onChange={handleChange('cpf')}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Data de Nascimento do Beneficiário</label>
                            <input 
                            type="text" 
                            className="form-control input-text" 
                            placeholder="Ex: 00/00/0000"
                            value={values.nascimento}
                            onChange={handleChange('nascimento')}
                            />
                        </div>
                        <button onClick={() => procurarBeneficiario()} className="btn btn-3d btn-3d-primary">Procurar</button>
                    </div>
                </div>
                <div className="col-md-6">

                    {feedbackDaBusca()}

                </div>
            </div>
        </div>
    </>
  );
}