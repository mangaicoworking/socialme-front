import React, { useState, useContext } from 'react';
import './style.css';
import FlagPortugal from './../../Assets/Flags/pt.svg';
import FlagBrazil from './../../Assets/Flags/br.svg';
import { LanguageContext } from './../../Contexts/LanguageContext';

export default function SelectLanguage(props) {
    const { changeLanguage } = useContext(LanguageContext);
    const [values, setValues] = useState({
        open: false,
        flag: FlagBrazil,
        language: 'POR'
      });
    //HANDLE CHANGE
    const handleChange = name => event => {
        switch(name) {
        case 'POR':
        default:
            return (
                changeLanguage('POR'),
                setValues({ ...values, flag: FlagBrazil, language: 'POR', open: false, })
            );
        case 'PPO':
            return (
                changeLanguage('PPO'),
                setValues({ ...values, flag: FlagPortugal, language: 'PPO', open: false, })
            )
        }
    };
    const toggleSelect = () => {
        if(values.open){
            setValues({ ...values, open: false });
        }else{
            setValues({ ...values, open: true });
        }
    }
    return (
        <>
            <div className="select">
                <img onClick={() => toggleSelect()} src={values.flag} alt="Bandeira do Brasil" />
                <span onClick={() => toggleSelect()}>{values.language}</span>
                <i onClick={() => toggleSelect()} className={"fas fa-chevron-down " + (values.open ? 'selectIconRotateUp' : 'selectIconRotateDown')}></i>
                <div className={"box-select " + (values.open ? 'display-inline-block selectBoxOpen' : 'display-none')}>
                    <ul className="box-select-ul">
                        <li className="box-select-li" onClick={handleChange('POR')}>
                            <img src={FlagBrazil} alt="Bandeira do Brasil" />
                            POR
                        </li>
                        <li className="box-select-li" onClick={handleChange('PPO')}>
                            <img src={FlagPortugal} alt="Bandeira do Brasil" />
                            PPO
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}