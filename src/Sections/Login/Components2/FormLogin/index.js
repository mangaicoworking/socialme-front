import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './../../../../Services/api';
import './style.css';

export default function Alert(props) {
  const [values, setValues] = useState({
      login: '',
      password: '',
      passo: '',
      loginError: false,
      loginErrorText: 'CPF não encontrado no sitema'
    });
  //HANDLE CHANGE
  const handleChange = name => event => {
    switch(name) {
      default:
        return setValues({ ...values, [name]: event.target.value });
    }
  };

  const verificaSeTemSenha = () => {
    api.get(`/person_consult_cpf/${values.login}`)
    .then(res => {
      //console.log(res.data);
      switch(res.data) {
        case 1:
          return setValues({ ...values, loginError: true });
        case 2:
          return setValues({ ...values, loginError: false, passo: 'criarSenha' });
        case 3:
          return setValues({ ...values, loginError: false, passo: 'entrar' });
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const criarSenha = () => {
    const obj = {
      "sistemas" : {
        "socialMe" : {
          "password" : values.password
        }
      }
    };

    api.put(`/person_update_by_cpf/${values.login}`,obj)
    .then(res => {
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const renderInputPassword = () => {
    switch(values.passo) {
      case 'criarSenha':
      case 'entrar':
        return (
          <>
            <div className="form-group campo">
              <label className="form-label">Senha</label>
              <input 
                type="password" 
                className={"form-control "} 
                placeholder="******"
                value={values.password}
                onChange={handleChange('password')}
              />        
            </div>
            <div>
              {values.passo === 'criarSenha' ?
                <div className="card-alert alert alert-success mb-0 campo">
                  Crie uma senha para acessar o sistema
                </div>
              :
                <div></div>
              }
            </div>
          </>
      )
    }
  }

  const renderBotãoLogin = () => {
    switch(values.passo) {
      case 'criarSenha':
        return <button className="btn btn-primary btn-block" onClick={() => criarSenha()}>Criar Senha</button>
        case 'entrar':
        return <button className="btn btn-primary btn-block">Entrar</button>
      default:
        return <button className="btn btn-primary btn-block" onClick={() => verificaSeTemSenha()}>Próximo</button>
    }
  }
  return (
    <>
        <div className="container formLogin">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src="./demo/brand/tabler.svg" className="h-6" alt=""/>
              </div>
              <div className="card">
                <div className="card-body p-6">
                  <div className="form-group campo">
                    <label className="form-label">CPF ou CNPJ</label>
                    <input 
                      type="text" 
                      className={"form-control "+(values.loginError ? 'is-invalid' : '')} 
                      placeholder="Insira seu CPF ou CNPJ"
                      value={values.login}
                      onChange={handleChange('login')}
                    />
                    <div className="invalid-feedback">{values.loginErrorText}</div>
                  </div>
                  {renderInputPassword()}
                  <div className="form-footer">
                    {renderBotãoLogin()}
                  </div>
                </div>
              </div>
              <div className="text-center text-muted">
                Ainda não é cadastrado?  
                <Link to="/registro"> Cadastra-se aqui</Link>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}