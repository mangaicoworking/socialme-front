import React, { useState, createContext } from 'react';
import POR from "./../Languages/POR.json";
import PPO from './../Languages/PPO.json';

export const LanguageContext = createContext();

const LanguageContextProvider = (props) => {
    const [values, setValues] = useState({
        language: 'POR',
        translate: POR
    })
    const changeLanguage = (SelectedLanguage) => {
        switch(SelectedLanguage) {
            case 'POR':
            default:
                return setValues({ ...values, language: SelectedLanguage, translate: POR })
            case 'PPO':
                return setValues({ ...values, language: SelectedLanguage, translate: PPO })
        }
    }
    
    return ( 
        <LanguageContext.Provider value={{ ...values, changeLanguage: changeLanguage }}>
            {props.children}
        </LanguageContext.Provider>
     );
}
 
export default LanguageContextProvider;