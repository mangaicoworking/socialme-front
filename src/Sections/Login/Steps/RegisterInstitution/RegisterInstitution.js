import React, { useState, useEffect } from 'react';
import './RegisterInstitution.css';
import api from './../../../../Services/api';
import { NotificationAnimation } from './../../../../Components/NotificationAnimation';

export default function FormInstitution(props) {
  const [values, setValues] = useState({
    fantasyName: '',
    corporateName: '',
    cnpj: '',
    email: '',
    telefoneFixo: '',
    celular: '',
    manager: false,
    giver: false,
    provider: false,
    notes: '',
    //SENHA
    password: '',
    confirmPassword: ''
  });
//HANDLE CHANGE
  const handleChange = name => event => {
    switch(name) {
      case 'manager':
      case 'giver':
      case 'provider':
        if(event.target.value === 'true'){
          return setValues({ ...values, [name]: true });
        }else if(event.target.value === 'false'){
          return setValues({ ...values, [name]: false });
        }
        break;
      default:
        return setValues({ ...values, [name]: event.target.value });
    }
  };
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
        dataNascimento: person.birth.date,
        paisNascimento: person.birth.country,
        estadoNascimento: person.birth.state,
        cidadeNascimento: person.birth.city,
      });
    }
  }, []);

  const registerInstitution = (e) => {
    e.preventDefault();
    const obj = {
      profile: {
        fantasyName: values.fantasyName,
        corporateName: values.corporateName,
        mainDocument: {
          name: 'CNPJ',
          number: props.login.replace(/[^\d]+/g,'')
        },
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
      },
      position:{
        manager:{
          status: values.manager
        },
        provider:{
          status: values.provider
        },
        giver:{
          status: values.giver
        }
      },
      notes: [
        {
          message: values.notes
        }
      ],
      auth:{
        password: values.password
      }
    };

  console.log(obj);
  api.post('/institution/register', obj)
  .then(res => {
      console.log(res);
      // Institution successfully saved: 12477EFEF77884A
      switch(res.data.header.code){
        case '12477EFEF77884A':
          return props.registerPersonSuccess()
        default:
          return;
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
                        <label className="form-label">CNPJ</label>
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
            <form onSubmit={registerInstitution}>
                <div className="row">

                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="Login-RegisterPerson-Title">
                        <h1>Dados</h1>
                    </div>
                </div>
                {/* NOME FANTASIA */}
                <div className="col-sm-12 col-md-8 col-lg-8">
                    <div className="form-group">
                    <label className="form-label">Nome Fantasia</label>
                    <input
                        required
                        type="text" 
                        className="form-control" 
                        placeholder="Digite o Nome Fantasia"
                        value={values.fantasyName}
                        onChange={handleChange('fantasyName')}
                    />
                    </div>
                </div>
                {/* Razão Social */}
                <div className="col-sm-12 col-md-8 col-lg-8">
                    <div className="form-group">
                    <label className="form-label">Razão Social</label>
                    <input
                        required 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite seu Razão Social"
                        value={values.corporateName}
                        onChange={handleChange('corporateName')}
                    />
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
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="Login-RegisterPerson-Title">
                    <h1>Mais Informações</h1>
                  </div>
                </div>
                {/* MAIS INFORMAÇÕES */}
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                    <label className="form-label">Fale um pouco da sua empresa</label>
                    <textarea 
                        rows="5" 
                        className="form-control" 
                        placeholder="Conte-nos o que te motiva!" 
                        value={values.notes}
                        onChange={handleChange('notes')}
                    ></textarea>
                    </div>
                </div>
            
                </div> {/* /row */}
            {/* CARD - DOADOR/FORNECEDOR */}
                <div className="row">
                {/* BENEFICIÁRIA */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <div className="form-label">Você será uma gestora?</div>
                    <div className="custom-controls-stacked">
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.manager ? true : false}
                            value={true}
                            onChange={handleChange('manager')} 
                        />
                        <span className="custom-control-label">Sim</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.manager ? false : true}
                            value={false}
                            onChange={handleChange('manager')} 
                        />
                        <span className="custom-control-label">Não</span>
                        </label>
                    </div>
                    </div>
                </div>
                {/* DOADOR */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <div className="form-label">Você será uma doadora?</div>
                    <div className="custom-controls-stacked">
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.giver ? true : false}
                            value={true}
                            onChange={handleChange('giver')} 
                        />
                        <span className="custom-control-label">Sim</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.giver ? false : true}
                            value={false}
                            onChange={handleChange('giver')} 
                        />
                        <span className="custom-control-label">Não</span>
                        </label>
                    </div>
                    </div>
                </div>
                {/* FORNECEDOR */}
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="form-group">
                    <div className="form-label">Você será uma fornecedora?</div>
                    <div className="custom-controls-stacked">
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.provider ? true : false}
                            value={true}
                            onChange={handleChange('provider')} 
                        />
                        <span className="custom-control-label">Sim</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                        <input 
                            type="checkbox" 
                            className="custom-control-input"
                            checked={values.provider ? false : true}
                            value={false}
                            onChange={handleChange('provider')} 
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