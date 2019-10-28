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
        nome: 'FABIO VITOR DE OLIVEIRA NORONHA',
        cpf: '11111111111',
        nascimento: '1996-11-26',
        nomeDaMae: '',
        pessoasEncontradas: [],
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
            name: values.name,
            mainDocument: values.cpf,
            birthDate: values.nascimento,
            motherName: values.nomeDaMae
        };
        api.post(`person/search`,obj)
        .then(res => {
            console.log(res.data)
            if(res.data.data.PeopleList.length === 0){
                setValues({ 
                    ...values,
                    encontrouAlguem: false,
                    erroNaBusca: false,
                })
            }else if(res.data.data.PeopleList.length > 0){
                console.log(res.data.data.PeopleList)
                setValues({ 
                    ...values,
                    encontrouAlguem: true,
                    erroNaBusca: false,
                    pessoasEncontradas: res.data.data.PeopleList
                })
            }
            /*
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
        */
        })
        .catch(function (error) {
        //console.log(error);
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
const vincularBeneficiario = (idDaPessoa) =>{
    const obj = {
        personId: idDaPessoa,
        programId: match.params.idDoPrograma
    };
    console.log(obj);
    
    api.post(`program/entrance`,obj)
    .then(res => {
    console.log(res.data)

    
    switch (res.data.header.code) {
        default:
        return;
        case '78E3F1120078EFC':
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
                    {/* 
                    <img src={`/assets/icones/outros/user.svg`} alt="Foto da Pessoa" />
                    <p>{values.nomeDaPessoaEncontrada}</p>
                    <span>{values.cpfDaPessoaEncontrada}</span><br/>
                    <span><Moment format="DD/MM/YYYY" add={{ hours: 4 }}>{values.nascimentoDaPessoaEncontrada}</Moment></span> 
                    <div className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundButtons">
                        <button onClick={() => cancelandoBusca()} className="btn btn-3d btn-3d-secondary">Cancelar</button>
                        <button onClick={() => vincularBeneficiario()} className="btn btn-3d btn-3d-primary">Víncular ao Programa</button>
                    </div>
                    */}
                    <ul>

                        {values.pessoasEncontradas.map((item,index) => 
                            <li key={index} className="managerDashboardProgramsProgramLinkBeneficiary-cardFoundSuccess-li">
                                <div className="containerImage">
                                    <img src={item.profile.photo} alt="Foto da Pessoa" />
                                </div>
                                <div style={{ paddingTop: '10px', width: '360px' }}>
                                    <p>{item.profile.name}</p>
                                    <span>{item.profile.mainDocument.number}</span>
                                </div>
                                <div>
                                <button onClick={() => vincularBeneficiario(item._id)}  className="btn btn-3d btn-3d-primary">Víncular</button>
                                </div>
                            </li>  
                        )}

                        
                    </ul>
                    <button onClick={() => cancelandoBusca()} className="btn btn-3d btn-3d-secondary buttonCancelar">Cancelar Consulta</button>
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
                        <div className="form-group">
                            <label className="form-label">Nome da mãe</label>
                            <input 
                            type="text" 
                            className="form-control input-text" 
                            placeholder="Ex: Goreth da Silva"
                            value={values.nomeDaMae}
                            onChange={handleChange('nomeDaMae')}
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