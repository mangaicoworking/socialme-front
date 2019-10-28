import React, { useState, useEffect } from 'react';
import './RegisterPerson.css';
import axios from 'axios';
import api from './../../../../Services/api';
import { dataBrasileiraMask } from './../../../../Services/masks';
import { NotificationAnimation } from './../../../../Components/NotificationAnimation';
import imagem2 from './../../../../Assets/Images/overlayDoador2.png';

export default function FormBeneficiary(props) {
  const [values, setValues] = useState({
    nome: '',
    nomeSocial: '',
    sexo: '',
    estadoCivil: '',
    rg: '',
    cpf: '',
    cns: '',
    pis: '',
    escolaridade: '',
    profissao: '',
    telefoneFixo: '',
    celular: '',
    email: '',
    pais: '',
    estado: '',
    cidade: '',
    //Nascimento
    dataNascimento: '',
    nacionalidade: '',
    paisNascimento: '',
    estadoNascimento: '',
    cidadeNascimento: '',
    //Outros
    maisInformacoes: '',
    beneficiaria: false,
    doadora: false,
    fornecedora: false,
    //SENHA
    password: '',
    confirmPassword: '',
    //Ações
    paisSelecionado: false,
    estadoSelecionado: false,
    paisNascimentoSelecionado: false,
    estadoNascimentoSelecionado: false,
    jsonEstadosCidades: [],
    overlayAberto: false,
    mouseEnterDoador: false,
    mostrarAlerta: false,
    typeAlerta: '',
    positionAlert: '',
    textAlert: '',
    redirect: false
  });
//HANDLE CHANGE
  const handleChange = name => event => {
    switch(name) {
      case 'dataNascimento':
        return setValues({ ...values, [name]: dataBrasileiraMask(event.target.value) });
      case 'beneficiaria':
      case 'doadora':
      case 'fornecedora':
        if(event.target.value === 'true'){
          return setValues({ ...values, [name]: true });
        }else if(event.target.value === 'false'){
          return setValues({ ...values, [name]: false });
        } 
      default:
        return setValues({ ...values, [name]: event.target.value });
    }
  };
//QUANDO ALTERA O STATUS DE DOADOR
useEffect(() => {
  if(values.overlayAberto){
    cadastrarBeneficiario();
  }
}, [values.doador]);
//ÚNICA VEZ
  useEffect(() => {
    lerEstadoCidades()
  }, []);
//ÚNICA VEZ
  useEffect(() => {
    if(props.person.profile){
      let person = props.person.profile;
      console.log(person)
      setValues({ 
        ...values, 
        nome: person.name,
        nomeSocial: person.socialName,
        sexo: person.sex,
        estadoCivil: person.civilState,
        escolaridade: person.schooling,
        profissao: person.profession,
        email: person.email,
        //Nascimento
        //dataNascimento: person.birth.date,
        //paisNascimento: person.birth.country,
        //estadoNascimento: person.birth.state,
        //cidadeNascimento: person.birth.city,
      });
      
    }
  }, []);
//LER ARQUIVO COM ESTADOS E CIDADES
  const lerEstadoCidades = () => {
    axios.get('./assets/files/estados-cidades.json')
      .then( response => {
        //console.log(response.data);
        setValues({ ...values, jsonEstadosCidades: response.data.estados });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
//QUANDO MUDAR O PAÍS
  useEffect(() => {
    setValues({ ...values, paisSelecionado: true });
  }, [values.pais]);
//QUANDO MUDAR O ESTADO
  useEffect(() => {
    setValues({ ...values, estadoSelecionado: true });
  }, [values.estado]);
//QUANDO MUDAR O PAÍS NASCIMENTO
  useEffect(() => {
    if(values.paisNascimento === "Brasil"){
      setValues({ ...values, paisNascimentoSelecionado: true, nacionalidade: 'Brasileiro(a)' });
    }
  }, [values.paisNascimento]);
//QUANDO MUDAR O ESTADO NASCIMENTO
  useEffect(() => {
    setValues({ ...values, estadoNascimentoSelecionado: true });
  }, [values.estadoNascimento]);
//OPÇÕES ESTADOS
  const renderOpcoesEstados = () => {
    if(values.paisSelecionado){
      return values.jsonEstadosCidades.map((item, index) => (
        <option key={index} value={item.nome}>{item.nome}</option>
      ));
    }
  }
//OPÇÕES CIDADES
  const renderOpcoesCidades = () => {
    if(values.estadoSelecionado){
      let indiceDoEstadoSelecionado = 0;
      for(let i = 0; i < values.jsonEstadosCidades.length; i++){
        if(values.jsonEstadosCidades[i].nome === values.estado){
          return values.jsonEstadosCidades[i].cidades.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ));
        }
      }
    }
  }
//OPÇÕES ESTADOS DE NASCIMENTO
  const renderOpcoesEstadosNascimento = () => {
    if(values.paisNascimentoSelecionado){
      return values.jsonEstadosCidades.map((item, index) => (
        <option key={index} value={item.nome}>{item.nome}</option>
      ));
    }
  }
//OPÇÕES CIDADES DE NASCIMENTO
  const renderOpcoesCidadesNascimento = () => {
    if(values.estadoNascimentoSelecionado){
      let indiceDoEstadoSelecionado = 0;
      for(let i = 0; i < values.jsonEstadosCidades.length; i++){
        if(values.jsonEstadosCidades[i].nome === values.estadoNascimento){
          return values.jsonEstadosCidades[i].cidades.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ));
        }
      }
    }
  }
//OVERLAY QUER SER UM DOADOR
  const abrirOverlayQuerSerUmDoador = () => {
    setValues({ ...values, overlayAberto: true });
  }
  const fecharOverlayQuerSerUmDoador = () => {
    setValues({ ...values, overlayAberto: false });
  }
//ANIMAÇÃO OVERLAY
  const mouseEnterDoador = () => {
    setValues({ ...values, mouseEnterDoador: true });
  }
  const mouseOutDoador = () => {
    setValues({ ...values, mouseEnterDoador: false });
  }
//CADASTRO
  const cadastrarComoDoador = () => {
    setValues({ ...values, doador: true });
  }
  const cadastrarSemDoador = () => {
    setValues({ ...values, doador: false });
  }
  const cadastrarBeneficiario = (e) => {
    e.preventDefault();
    const obj = {
      profile: {
        name: values.nome,
        socialName: values.nomeSocial,
        sex: values.sexo,
        socialSex: values.sexo,
        birth: {
          date: values.dataNascimento,
          nationality: [
            {
              country: values.nacionalidade
            }
          ],
          country: values.paisNascimento,
          stade: values.estadoNascimento,
          city: values.cidadeNascimento
        },
        civilState: values.estadoCivil,
        schooling: values.escolaridade,
        profession: values.profissao,
        phones: [
          {
            main: true,
            number: values.celular,
            description: "Telefone Celular"
          },
          {
            main: false,
            number: values.telefoneFixo,
            description: "Telefone Fixo"
          }
        ],
        email: values.email,
        mainDocument: {
          name: "CPF",
          number: props.login.replace(/[^\d]+/g,'')
        },
        documents:[
          {
            name: "RG",
            number: values.rg
          },
          {
            name: "CNS",
            number: values.cns
          },
          {
            name: "PIS",
            number: values.pis
          }
        ],
        /*
        pais: values.pais,
        cidade: values.cidade,
        estado: values.estado,
        */
      },
      position:{
        beneficiary:{
          status: values.beneficiaria
        },
        provider:{
          status: values.fornecedora
        },
        giver:{
          status: values.doadora
        }
      },
      notes: [
        {
          message: values.maisInformacoes
        }
      ],
      auth:{
        password: values.password
      }
    };

  console.log(obj);
  api.post('/person/register', obj)
  .then(res => {
      console.log(res);
      // SUCCESS: CD3114A1FFFAC33
      switch(res.data.header.code){
        case 'CD3114A1FFFAC33':
        default:
          props.registerPersonSuccess()
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

  return (
    <>
        <div data-aos="fade-left" className="Login-RegisterPerson-GeneralContainer">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group formGroupMainDocument">
                        <label className="form-label">CPF</label>
                        <input
                            disabled
                            type="text" 
                            className="form-control" 
                            placeholder="Digite seu CPF"
                            value={props.login}
                        />
                        <i onClick={() => props.stepBack()} className="far fa-times-circle"></i>
                    </div>
                </div>
            </div>
            <div className="row Login-RegisterPerson-NotificationRow">
              <div className="col-md-12">
                {props.havePassword ?
                  <></>
                :
                <NotificationAnimation
                  color="primary"
                  icon=""
                  text="Preencha os campos abaixo para realizar o seu cadastro"
                />
              }
                
              </div>
            </div>
            <form onSubmit={cadastrarBeneficiario}>
                <div className="row">

                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="Login-RegisterPerson-Title">
                        <h1>Dados</h1>
                    </div>
                </div>
                {/* NOME */}
                <div className="col-sm-12 col-md-8 col-lg-8">
                    <div className="form-group">
                    <label className="form-label">Nome Completo</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite seu nome completo"
                        value={values.nome}
                        onChange={handleChange('nome')}
                    />
                    </div>
                </div>
                {/* SEXO */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <div className="form-label">Sexo</div>
                    <div className="custom-controls-stacked">
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.sexo === 'Feminino' ? true : false}
                            value="Feminino"
                            onChange={handleChange('sexo')} 
                        />
                        <span className="custom-control-label">Feminino</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.sexo === 'Masculino' ? true : false}
                            value="Masculino"
                            onChange={handleChange('sexo')} 
                        />
                        <span className="custom-control-label">Masculino</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.sexo === 'Indefinido' ? true : false}
                            value="Indefinido"
                            onChange={handleChange('sexo')} 
                        />
                        <span className="custom-control-label">Indefinido</span>
                        </label>
                    </div>
                    </div>
                </div>
                {/* NOME SOCIAL */}
                <div className="col-sm-12 col-md-8 col-lg-8">
                    <div className="form-group">
                    <label className="form-label">Nome Social</label>
                    <input
                        required 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite seu nome social"
                        value={values.nomeSocial}
                        onChange={handleChange('nomeSocial')}
                    />
                    </div>
                </div>
                {/* ESTADO CIVIL */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <label className="form-label">Estado Civil</label>
                    <select 
                        className="form-control"
                        value={values.estadoCivil}
                        onChange={handleChange('estadoCivil')}
                    >
                        <option value="">Selecione...</option>
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                        <option value="Separado(a) Judicialmente">Separado(a) Judicialmente</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                    </select>
                    </div>
                </div>
                {/* RG */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">RG</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite seu RG"
                        value={values.rg}
                        onChange={handleChange('rg')}
                    />
                    </div>
                </div>
                {/* CNS */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">CNS</label>
                    <input
                        required 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite seu CNS"
                        value={values.cns}
                        onChange={handleChange('cns')}
                    />
                    </div>
                </div>
                {/* PIS */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">PIS</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite seu PIS"
                        value={values.pis}
                        onChange={handleChange('pis')}
                    />
                    </div>
                </div>
                {/* ESCOLARIDADE */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">Escolaridade</label>
                    <select
                        required
                        className="form-control"
                        value={values.escolaridade}
                        onChange={handleChange('escolaridade')}
                    >
                        <option value="">Selecione...</option>
                        <option value="Analfabeto">Analfabeto</option>
                        <option value="Ensino fundamental incompleto">Ensino fundamental incompleto</option>
                        <option value="Ensino fundamental completo">Ensino fundamental completo</option>
                        <option value="Ensino médio incompleto">Ensino médio incompleto</option>
                        <option value="Ensino médio completo">Ensino médio completo</option>
                        <option value="Superior completo">Superior completo</option>
                        <option value="Pós-graduação">Pós-graduação</option>
                        <option value="Mestrado">Mestrado</option>
                        <option value="Doutorado">Doutorado</option>
                        <option value="Pós-Doutorado">Pós-Doutorado</option>
                    </select>
                    </div>
                </div>
                {/* EMAIL */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        required 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite sua Email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                    </div>
                </div>
                {/* TELEFONE FIXO */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">Telefone Fixo</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite o número do seu Telefone Fixo"
                        value={values.telefoneFixo}
                        onChange={handleChange('telefoneFixo')}
                    />
                    </div>
                </div>
                {/* CELULAR */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">Celular</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite o número do seu Celular"
                        value={values.celular}
                        onChange={handleChange('celular')}
                    />
                    </div>
                </div>
                {/* PROFISSÃO */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">Profissão</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite sua Profissão"
                        value={values.profissao}
                        onChange={handleChange('profissao')}
                    />
                    </div>
                </div>
                {/* PAÍS */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">País</label>
                    <select
                        required
                        className="form-control"
                        value={values.pais}
                        onChange={handleChange('pais')}
                    >
                        <option value="">Selecione...</option>
                        <option value="Brasil">Brasil</option>
                    </select>
                    </div>
                </div>
                {/* ESTADO */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">Estado</label>
                    <select
                        required
                        className={"form-control "+(values.paisSelecionado ? '' : 'select-disable')}
                        value={values.estado}
                        onChange={handleChange('estado')}
                    >
                        {renderOpcoesEstados()}
                    </select>
                    </div>
                </div>
                {/* CIDADE */}
                <div className="col-sm-12 col-md-3 col-lg-3">
                    <div className="form-group">
                    <label className="form-label">Cidade</label>
                    <select
                        required
                        className={"form-control "+(values.estadoSelecionado ? '' : 'select-disable')}
                        value={values.cidade}
                        onChange={handleChange('cidade')}
                    >
                        {renderOpcoesCidades()}
                    </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="Login-RegisterPerson-Title">
                        <h1>Informações do Nascimento</h1>
                    </div>
                </div>
                {/* PAÍS NASCIMENTO */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <label className="form-label">País do Nascimento</label>
                    <select
                        required
                        className="form-control"
                        value={values.paisNascimento}
                        onChange={handleChange('paisNascimento')}
                    >
                        <option value="">Selecione...</option>
                        <option value="Brasil">Brasil</option>
                    </select>
                    </div>
                </div>
                {/* ESTADO NASCIMENTO */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <label className="form-label">Estado do Nascimento</label>
                    <select
                        required
                        className={"form-control "+(values.paisNascimentoSelecionado ? '' : 'select-disable')}
                        value={values.estadoNascimento}
                        onChange={handleChange('estadoNascimento')}
                    >
                        {renderOpcoesEstadosNascimento()}
                    </select>
                    </div>
                </div>
                {/* CIDADE NASCIMENTO */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <label className="form-label">Cidade do Nascimento</label>
                    <select
                        required
                        className={"form-control "+(values.estadoNascimentoSelecionado ? '' : 'select-disable')}
                        value={values.cidadeNascimento}
                        onChange={handleChange('cidadeNascimento')}
                    >
                        {renderOpcoesCidadesNascimento()}
                    </select>
                    </div>
                </div>
                {/* NACIONALIDADE */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <label className="form-label">Nacionalidade</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite sua Nacionalidade"
                        value={values.nacionalidade}
                        onChange={handleChange('nacionalidade')}
                    />
                    </div>
                </div>
                {/* NASCIMENTO */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <label className="form-label">Nascimento</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite seu Nascimento"
                        value={values.dataNascimento}
                        onChange={handleChange('dataNascimento')}
                    />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="Login-RegisterPerson-Title">
                    <h1>Mais Informações</h1>
                  </div>
                </div>
                {/* MAIS INFORMAÇÕES */}
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                    <label className="form-label">Fale um pouco de você</label>
                    <textarea 
                        rows="5" 
                        className="form-control" 
                        placeholder="Conte-nos o que te motiva!" 
                        value={values.maisInformacoes}
                        onChange={handleChange('maisInformacoes')}
                    ></textarea>
                    </div>
                </div>
            
                </div> {/* /row */}
            {/* CARD - DOADOR/FORNECEDOR */}
                <div className="row">
                {/* BENEFICIÁRIA */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <div className="form-label">Você quer ser beneficiário?</div>
                    <div className="custom-controls-stacked">
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.beneficiaria ? true : false}
                            value={true}
                            onChange={handleChange('beneficiaria')} 
                        />
                        <span className="custom-control-label">Sim</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.beneficiaria ? false : true}
                            value={false}
                            onChange={handleChange('beneficiaria')} 
                        />
                        <span className="custom-control-label">Não</span>
                        </label>
                    </div>
                    </div>
                </div>
                {/* DOADOR */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <div className="form-label">Você quer ser doador?</div>
                    <div className="custom-controls-stacked">
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.doadora ? true : false}
                            value={true}
                            onChange={handleChange('doadora')} 
                        />
                        <span className="custom-control-label">Sim</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.doadora ? false : true}
                            value={false}
                            onChange={handleChange('doadora')} 
                        />
                        <span className="custom-control-label">Não</span>
                        </label>
                    </div>
                    </div>
                </div>
                {/* FORNECEDOR */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <div className="form-label">Você quer ser fornecedor?</div>
                    <div className="custom-controls-stacked">
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.fornecedora ? true : false}
                            value={true}
                            onChange={handleChange('fornecedora')} 
                        />
                        <span className="custom-control-label">Sim</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.fornecedora ? false : true}
                            value={false}
                            onChange={handleChange('fornecedora')} 
                        />
                        <span className="custom-control-label">Não</span>
                        </label>
                    </div>
                    </div>
                </div>
                </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="Login-RegisterPerson-Title">
                  <h1>Autenticação</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <div className="form-group">
                    <label className="form-label">Senha</label>
                    <input
                        required
                        type="password" 
                        className="form-control" 
                        placeholder="********"
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3">
                  <div className="form-group">
                    <label className="form-label">Confirme a sua senha</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="********"
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    />
                  </div>
                </div>
              </div>

            {/* BOTÃO REGISTRO */}
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <button className="btn btn-3d btn-3d-secondary" onClick={() => props.stepBack()}>Voltar</button>
                    <button type="submit" className="btn btn-3d btn-3d-primary btn-float-right">Registrar</button>
                </div>
            </div>
            </form>
        </div>
    </>
  );
}