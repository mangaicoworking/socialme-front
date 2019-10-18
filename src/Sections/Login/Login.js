import React, { useState } from 'react';
import Navbar from './../../Components/Layout/Navbar';
import './Login.css';
import LoginVerification from './Components/LoginVerification';

export default function Login(props) {
  const [values, setValues] = useState({
    login:'',
    tipoDeLogin: '',
    cpfInvalido: false
  });
//HANDLE CHANGE
const handleChange = name => event => {
  switch(name) {
    default:
      return setValues({ ...values, [name]: event.target.value });
  }
};
const VerificaSeCadastrouPlanoComSucesso = (value) => {
  console.log('RECEBEU DADOS DO FILHO -> ' + value);
}

  return (
    <>
      <Navbar path={props.match.path} />
      <div className="pageLogin">
        <div className="card">
          <div className="progressTopCard">
            <div className="progress"></div>
          </div>
          <div className="cardBody ">
            <LoginVerification 
              cpfInvalido={values.cpfInvalido}
              avisaPaiQueCadastrouPlanoComSucesso={VerificaSeCadastrouPlanoComSucesso.bind(this)}
            />
          </div>
        </div>
      </div>
    </>
  );
}