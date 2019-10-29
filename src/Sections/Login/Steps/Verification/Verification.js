import React, { useState, useEffect, useContext } from "react";
import './Verification.css';
import { cpfMaskContinuos, cnpjMask  } from './../../../../Services/masks';
import api from './../../../../Services/api';
import { DebugContext } from './../../../../Contexts/DebugContext';

const LoginVerification = (props) => {
    const { DebugConsole } = useContext(DebugContext);

    const [login, setLogin] = useState({
        mainDocument: '',
        warranty: ''
    });
    const [mainDocument, setMainDocument] = useState({
        value: ''
    });
//HANDLE CHANGE
    const handleChangeMainDocument = name => event =>  {
        if(event.target.value.length > 18){
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
        console.log('VERIFICAÇÃO')
        const obj = {
            login: mainDocument.value.replace(/[^\d]+/g,'')
        }
        api.post('/prelogin', obj)
        .then(res => {
            console.log(res);
            if(DebugConsole)console.log('Query API on route -> /prelogin ', res );
            // Não Encontrou Pessoa: ABF54A98CD1A6ED
            // Encontrou Pessoa, mas sem senha: ABF54A98CDE1987
            // Encontrou Pessoa, com senha: ABF54A98CDE14AA
            // Não Encontrou Instituição: ABF54A98CD74238
            // Encontrou Instituição, sem senha: ABF54A98CDE1988
            // Encontrou Instituição, com senha: ABF54A98CD74AAA
            switch(res.data.header.code.toUpperCase()){
                // PESSOA ou Instituição: Não encontrou
                case 'ABF54A98CD74AEA':
                    let mainDocumentPure = mainDocument.value.replace(/[^\d]+/g,'')
                    if(mainDocumentPure.length === 11){
                        return(
                            props.verificationResponse(res.data.header.code, mainDocument.value, 'nothing')
                        )
                    }else{
                        return(
                            props.verificationResponse(res.data.header.code, mainDocument.value, 'nothing')
                        )
                    }   
                // PESSOA: Encontrou, sem senha
                case 'ABF54A98CDE1987':
                    return(
                        props.verificationResponse(res.data.header.code, mainDocument.value, res.data.data.person)
                    )
                // PESSOA: Encontrou, com senha
                case 'ABF54A98CDE14AA':
                    return (
                        props.verificationResponse(res.data.header.code, mainDocument.value, res.data.data.person)
                    )
                // INSTITUIÇÃO: Encontrou, com senha
                case 'ABF54A98CD74AAA':
                    return (
                        props.verificationResponse(res.data.header.code, mainDocument.value, res.data.data.institution)
                    )
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