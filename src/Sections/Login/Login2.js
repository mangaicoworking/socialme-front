import React, { useState } from "react";
import './Login2.css';
import Logo from './../../Assets/Images/logo.png';
import SelectLanguage from './../../Components/SelectLanguage';
import { Verification } from './Steps/Verification';
import { LoginReal } from './Steps/LoginReal';
import { RegisterPerson } from './Steps/RegisterPerson';

const Login = () => {
    const [values, setValues] = useState({
        inProgress: false,
        login: '',
        stepVerification: true,
        stepVerificationHavePassword: false,
        stepVeriticationRegisterData: [],
        stepRegisterPerson: false,
        stepLogin: false
    });
// RENDER CARDS
    const renderCards = () => {
        if(values.stepVerification){
            return(
                <Verification changeLogin={changeLogin.bind(this)} verificationResponse={verificationResponse.bind(this)}  />
            )
        }else if(values.stepRegisterPerson){
            return(
                <RegisterPerson 
                havePassword={values.stepVerificationHavePassword}
                person={values.stepVeriticationRegisterData}
                login={values.login} 
                stepBack={stepBack.bind(this)} 
                registerPersonSuccess={registerPersonSuccess.bind(this)} 
                />
            )
        }else if(values.stepLogin){
            return(
                <LoginReal login={values.login} />
            )
        }
    }
// CHANGE LOGIN
const changeLogin = (login) => {
    setValues({ ...values, login: login })
}
// VERIFICATION RESPONSE
    const verificationResponse = (message, mainDocument, data) => {
        // Não encontrou ninguém : ABF54A98CD1A6ED
        // Encontrou alguém, mas sem senha: ABF54A98CDE1987
        // Encontrou alguém, com senha: ABF54A98CDE14AA
        //console.log('RESPONSE -> '+message);
        //console.log('MAINDOCUMENT -> '+mainDocument);
        switch(message.toUpperCase()){
            // Não encontrou
            case 'ABF54A98CD1A6ED':
            default:
                return(
                    setValues({ ...values, stepVerification: false, stepRegisterPerson: true, stepLogin: false })
                )
            case 'ABF54A98CDE1987':
                return(
                    setValues({ ...values, stepVerification: false, stepRegisterPerson: true, stepLogin: false, stepVeriticationRegisterData: data })
                )
            case 'ABF54A98CDE14AA':
                return (
                    setValues({ ...values, stepVerification: false, stepRegisterPerson: false, stepLogin: true })
                )
        }
    
        
    }
// REGISTER PERSON > BACK
    const stepBack = () => {
        setValues({ ...values, stepVerification: true, stepRegisterPerson: false, stepLogin: false })
    }
// REGISTER PERSON > SUCCESS{
    const registerPersonSuccess = () => {
        setValues({ ...values, stepVerification: false, stepRegisterPerson: false, stepLogin: true })
    }

    return ( 
        <div className="Login-ContainerGeral">
            <div className="Login-Navbar">
                <img className="Login-Navbar-Logo" src={Logo} alt="Logo" />
                <div className="Login-Navbar-RightItens">
                    <SelectLanguage />
                </div>
            </div>
            <div className="container">
                <div
                    className={"Login-Card-GeneralContainer "
                    +(values.stepVerification ? ' Login-Card-VerificationContainer ' : '')
                    +(values.stepRegisterPerson ? ' Login-Card-RegisterPersonContainer ' : '')
                    +(values.stepLoginReal ? ' Login-Card-LostepLoginRealContainer ' : '')
                    }
                >
                    {renderCards()}
                </div>
            </div>
            {/* 
            <div className="Login-Footer">
                <ul className="Login-Footer-ul">
                    <li className="Login-Footer-li">
                        <a href="/">Sobre</a>
                    </li>
                    <li className="Login-Footer-li">
                        |
                    </li>
                    <li className="Login-Footer-li">
                        <a href="/">Termos</a>
                    </li>
                </ul>
            </div>
            */}
        </div>
    );
}
 
export default Login;
