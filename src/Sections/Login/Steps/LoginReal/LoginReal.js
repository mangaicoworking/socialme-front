import React, { useState, useContext } from "react";
import './LoginReal.css';
import api from './../../../../Services/api';
import { AuthContext } from './../../../../Contexts/AuthContext';

const LoginReal = (props) => {
    const { populateAuthPerson } = useContext(AuthContext);
    const [values, setValues] = useState({
        password: ''
    });
//HANDLE CHANGE
    const handleChange = name => event =>  {
        setValues({ ...values, [name]: event.target.value })
    };
//LOGIN
const login = () => {
    console.log('LOGIN')
    const obj = {
        login: props.login.replace(/[^\d]+/g,''),
        password: values.password
    }
    api.post('/login', obj)
    // SUCCESS > ABF54E009A77B0C
    .then(res => {
        console.log(res);
        switch(res.data.header.code){
            case 'asfas':
            default:
                return;
            case 'ABF54E009A77B0C':
                let token = res.data.data['mundo-data-token'];
                console.log(token)
                if(res.data.data.person){
                    console.log('Login > Person')
                    populateAuthPerson(token, res.data.data.person);
                }  
        }
    })
    .catch(function (error) {
    console.log(error);
    })
}

    return ( 
        <>
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
