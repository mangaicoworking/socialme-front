import React, { useState } from 'react';
import './style.css';

export default function LoginVerification(props) {
  const [values, setValues] = useState({
    login:'',
    tipoDeLogin: '',
    verificando: false,
    cpfInvalido: props.cpfInvalido
  });
//HANDLE CHANGE
const handleChange = name => event => {
  switch(name) {
    default:
      return setValues({ ...values, [name]: event.target.value });
  }
};

const mandandoMensagemParaPai = () => {
  props.avisaPaiQueCadastrouPlanoComSucesso(values.login);
}

  return (
    <div className="loginVerification">
        <h3>Entre com o seu <span>CPF</span> ou seu <span>CNPJ</span></h3>
        <div className="form-group">
            <input 
            type="text" 
            className={"form-control " + (values.cpfInvalido ? 'is-invalid' : '')} 
            placeholder="Digite seu CPF ou CNPJ" 
            value={values.login}
            onChange={handleChange('login')}
            />
            {values.cpfInvalido ? 
              <div className="invalid-feedback">Invalid feedback</div>
            :
              <div></div>
            }
        </div>
        <div className="rowCard">
            {values.verificando ? 
                <p><i className="fas fa-spinner icone-rodando"></i> Verificando CPF</p>
            :
                <p></p>
            }
            <button className="btn btnPrimary" onClick={() => mandandoMensagemParaPai()}>Próximo</button>
        </div>
    </div>
  );
}