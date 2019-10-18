import React, { useState, useEffect } from "react";
import './Verification.css';
import { cpfMaskContinuos, cnpjMask  } from './../../../../Services/masks';
import api from './../../../../Services/api';
import { tsPropertySignature } from "@babel/types";

const LoginVerification = (props) => {
    const [login, setLogin] = useState({
        mainDocument: '',
        warranty: ''
    });
    const [mainDocument, setMainDocument] = useState({
        value: ''
    });
//HANDLE CHANGE
    const handleChangeMainDocument = name => event =>  {
        if(event.target.value.length > 19){
            return;
        }
        if(event.target.value.length  <= 14){
            return(
                setMainDocument({ ...mainDocument, [name]: cpfMaskContinuos(event.target.value) }),
                props.changeLogin(event.target.value)
            )
            
        }else if(event.target.value.length  > 14){
            return(
                setMainDocument({ ...mainDocument, [name]: cnpjMask(event.target.value) }),
                props.changeLogin(event.target.value)
            )
        }
    };
//MudarLogin
useEffect(() => {
    //CPF: 000.000.000-00 = 14
    //CNPJ: 09.376.495/0001-22 = 19
    switch(true) {
        default:
        case (mainDocument.value.length < 13):
            return (
                setLogin({ ...login, mainDocument: 'CPF', warranty: '' })
            )
        case (mainDocument.value.length === 14):
            return (
                setLogin({ ...login, mainDocument: 'CPF', warranty: 'Parece ser um CPF' })
            )
        case (mainDocument.value.length >= 15 ):
            return (
                setLogin({ ...login, mainDocument: 'CNPJ', warranty: 'Parece ser um CNPJ'  })
            )
    }
}, [mainDocument]);
//VERIFICA A SITUAÇÃO
    const verificacao = () => {
        const obj = {
            login: mainDocument.value.replace(/[^\d]+/g,'')
        }
        api.post('/prelogin', obj)
        .then(res => {
            //console.log(res);
            // Não encontrou ninguém : ABF54A98CD1A6ED
            // Encontrou alguém, mas sem senha: ABF54A98CDE1987
            // Encontrou alguém, com senha: ABF54A98CDE14AA
            switch(res.data.header.code.toUpperCase()){
                // Não encontrou
                case 'ABF54A98CD1A6ED':
                default:
                    return(
                        props.verificationResponse(res.data.header.code, mainDocument.value, 'nothing')
                    )
                case 'ABF54A98CDE1987':
                    return(
                        props.verificationResponse(res.data.header.code, mainDocument.value, res.data.data.person)
                    )
                case 'ABF54A98CDE14AA':
                    return (
                        props.verificationResponse(res.data.header.code, mainDocument.value, 'nothing')
                    )
            }
            
        })
        .catch(function (error) {
        console.log(error);
        })
    }
    return ( 
        <>
            <div className="LoginVerification-GeneralContainer">
                <div className="form-group">
                    <label>CPF ou CNPJ</label>
                    <input
                    data-aos="fade-up"
                    type="text" 
                    className="form-control input-text" 
                    placeholder="Digite seu CPF ou CNPJ"
                    value={mainDocument.value}
                    onChange={handleChangeMainDocument('value')}
                    />
                    <div className="valid-feedback">{login.warranty}</div>
                </div>
                <div className="form-group">
                    <button onClick={verificacao} data-aos="fade-right" className="btn btn-3d btn-3d-primary">Próximo</button>
                </div>
            </div>
        </>
    );
}
 
export default LoginVerification;
