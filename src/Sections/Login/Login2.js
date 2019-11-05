import React, { useState } from "react";
import './Login2.css';
import Logo from './../../Assets/Images/logo.png';
import SelectLanguage from './../../Components/SelectLanguage';
import { Verification } from './Steps/Verification';
import { LoginReal } from './Steps/LoginReal';
import { RegisterPerson } from './Steps/RegisterPerson';
import { RegisterInstitution } from "./Steps/RegisterInstitution";
import { Link } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        inProgress: false,
        login: '',
        stepVerification: true,
        stepVerificationHavePassword: false,
        stepVeriticationRegisterData: [],
        stepRegisterPerson: false,
        stepRegisterInstitution: false,
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
        }else if(values.stepRegisterInstitution){
            return(
                <RegisterInstitution 
                havePassword={values.stepVerificationHavePassword}
                person={values.stepVeriticationRegisterData}
                login={values.login} 
                stepBack={stepBack.bind(this)} 
                registerPersonSuccess={registerPersonSuccess.bind(this)} 
                />
            )
        }else if(values.stepLogin){
            return(
                <LoginReal stepBack={stepBack.bind(this)} login={values.login} data={values.stepVeriticationRegisterData} />
            )
        }
    }
// CHANGE LOGIN
const changeLogin = (login) => {
    setValues({ ...values, login: login })
}
// VERIFICATION RESPONSE
    const verificationResponse = (message, mainDocument, data) => {
        // Não Encontrou Pessoa: ABF54A98CD1A6ED
        // Encontrou Pessoa, mas sem senha: ABF54A98CDE1987
        // Encontrou Pessoa, com senha: ABF54A98CDE14AA
        // Não Encontrou Instituição: ABF54A98CD74238
        // Encontrou Instituição, sem senha: ABF54A98CDE1988
        // Encontrou Instituição, com senha: ABF54A98CD74AAA
        //console.log('RESPONSE -> '+message);
        //console.log('MAINDOCUMENT -> '+mainDocument);
        switch(message.toUpperCase()){
            // PESSOA: Não encontrou
            case 'ABF54A98CD74AEA':
                let mainDocumentPure = mainDocument.replace(/[^\d]+/g,'')
                if(mainDocumentPure.length === 11){
                    return(
                        setValues({ ...values, stepVerification: false, stepRegisterPerson: true, stepLogin: false })
                    )
                }else{
                    return(
                        setValues({ ...values, stepVerification: false, stepRegisterInstitution: true, stepLogin: false })
                    )
                }  
            // PESSOA: Encontrou, sem senha
            case 'ABF54A98CDE1987':
                return(
                    setValues({ ...values, stepVerification: false, stepRegisterPerson: true, stepLogin: false, stepVeriticationRegisterData: data })
                )
            // PESSOA: Encontrou, com senha
            case 'ABF54A98CDE14AA':
                return (
                    setValues({ ...values, stepVerification: false, stepRegisterPerson: false, stepLogin: true, stepVeriticationRegisterData: data  })
                )
            // INSTITUIÇÃO: Encontrou, com senha
            case 'ABF54A98CD74AAA':
                return (
                    setValues({ ...values, stepVerification: false, stepRegisterPerson: false, stepRegisterInstitution: false, stepLogin: true, stepVeriticationRegisterData: data  })
                )
            default:
                return;
        }
    
        
    }
// REGISTER PERSON > BACK
    const stepBack = () => {
        setValues({ ...values, stepVerification: true, stepRegisterPerson: false, stepRegisterInstitution: false, stepLogin: false })
    }
// REGISTER PERSON > SUCCESS{
    const registerPersonSuccess = () => {
        setValues({ ...values, stepVerification: false, stepRegisterPerson: false, stepRegisterInstitution: false, stepLogin: true })
    }

    return ( 
        <div className="Login-ContainerGeral">
            <div className="Login-Navbar">
                <Link to="/">
                <img className="Login-Navbar-Logo" src={Logo} alt="Logo" />
                </Link>
                <div className="Login-Navbar-RightItens">
                    <SelectLanguage />
                </div>
            </div>
            <div className="container">
                <div
                    className={"Login-Card-GeneralContainer "
                    +(values.stepVerification ? ' Login-Card-VerificationContainer ' : '')
                    +(values.stepRegisterPerson ? ' Login-Card-RegisterPersonContainer ' : '')
                    +(values.stepRegisterInstitution ? ' Login-Card-RegisterPersonContainer ' : '')
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
