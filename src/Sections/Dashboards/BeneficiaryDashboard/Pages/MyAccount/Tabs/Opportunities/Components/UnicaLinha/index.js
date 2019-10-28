import React, { useState, useContext } from 'react';
import api from './../../../../../../../../../Services/api';
import { AuthContext } from './../../../../../../../../../Contexts/AuthContext';

const UnicaLinhaDoProgramaQuePossoParticipar = (props) => {
    const { person, institution } = useContext(AuthContext)
    const [solicitou, setSolicitou] = useState(false);

    const solicitarEntrada = () => {
        /*
        console.log('PERSON ID N -> ' + person._id)
        console.log('PERSON ID A -> ' + props.personId)
        console.log('PROGRAMA ID -> ' + props.program._id)
       */
        const obj = {
            personId: props.personId,
            programId: props.program._id
        };
        console.log('OBJ -> ', obj);
         
        api.post(`program/entrance`,obj)
        .then(res => {
            console.log(res.data)
            setSolicitou(true)
        })
        
    }
    return ( 
        <li className="beneficiaryDashboardMyAccountMyPrograms-li">
            <div className="col-md-1">
                <div className="beneficiaryDashboardMyAccountMyPrograms-imageProgramContainer">
                <div style={{backgroundImage: `url('${props.program.photo}')`}} className="beneficiaryDashboardMyAccountMyPrograms-imageProgram"></div>
                </div> 
            </div>
            <div className="col-md-5">
                <div className="beneficiaryDashboardMyAccountMyPrograms-nameProgram">
                    <p>{props.program.name}</p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="beneficiaryDashboardMyAccountMyPrograms-actions">
                    {solicitou ?
                        <p>Aguarde a resposta do programa</p>
                    :
                        <button onClick={() => solicitarEntrada()} className="btn btn-3d btn-3d-primary">Solicitar</button>   
                    }
                </div>
            </div>
        </li>
     );
}
 
export default UnicaLinhaDoProgramaQuePossoParticipar;