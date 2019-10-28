import React, { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';
import './LoginReal.css';
import api from './../../../../Services/api';
import { DebugContext } from './../../../../Contexts/DebugContext';
import { AuthContext } from './../../../../Contexts/AuthContext';

const LoginReal = (props) => {
    const { DebugConsole } = useContext(DebugContext);
    const { populateAuth } = useContext(AuthContext);

    const [values, setValues] = useState({
        password: '',
        redirect: false,
        dashboards: []
    });

//HANDLE CHANGE
    const handleChange = name => event =>  {
        setValues({ ...values, [name]: event.target.value })
    };
//LOGIN
const login = () => {
    const obj = {
        login: props.login.replace(/[^\d]+/g,''),
        password: values.password
    }
    api.post('/login', obj)
    // PERSON SUCCESS > ABF54E009A77B0C
    // INSTITUTION SUCCESS > ABF54E009A78B0C
    .then(res => {
        console.log(res);
        let token = res.data.data['mundo-data-token'];
        switch(res.data.header.code){
            case 'ABF54E009A77B0C':
                console.log('Login > Person')
                populateAuth(token, res.data.data.person, 'person');
                return setValues({ ...values, dashboards: res.data.data.person.position, redirect: true });
            case 'ABF54E009A78B0C':
                    console.log('Login > Institution')
                    populateAuth(token, res.data.data.institution, 'institution');
                    return setValues({ ...values, dashboards: res.data.data.institution.position, redirect: true });
            default:
                return;
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}

const redirect = () => {
    console.log('redirect')
    if(values.redirect){
        console.log('redirect true')
        if(values.dashboards.beneficiary){
            return(
                <Redirect to="/me/painel-da-beneficiaria/minha-conta" />
            )
        }else if(values.dashboards.manager){
            return(
                <Redirect to="/me/painel-da-gestora/movimentacoes" />
            )
        }else if(values.dashboards.provider){
            return(
                <Redirect to="/me" />
            )
        }else if(values.dashboards.giver){
            return(
                <Redirect to="/me" />
            )
        }else{
            return(
                <Redirect to="/me" />
            )
        }
        
    }
}
    return ( 
        <>
            {redirect()}
            <div className="Login-LoginReal-GeneralContainer">
      
                <div className="form-group">
                    <input
                    disabled
                    data-aos="fade-up"
                    type="text" 
                    className="form-control input-text"
                    value={props.login}
                    />
                </div>
                <div className="form-group">
                    <input
                    required
                    data-aos="fade-up"
                    type="password" 
                    className="form-control input-text" 
                    placeholder="Digite sua senha"
                    value={values.password}
                    onChange={handleChange('password')}
                    />
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <button className="btn btn-3d btn-3d-secondary" onClick={() => props.stepBack()}>Voltar</button>
                        <button onClick={() => login()} className="btn btn-3d btn-3d-primary btn-float-right">Entrar</button>
                    </div>
                </div>
                
            </div>
        </>
    );
}
 
export default LoginReal;
