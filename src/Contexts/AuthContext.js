import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [values, setValues] = useState({
        token: '',
        person: {},
        institution: {}
    })
    const populateAuthPerson = (tokenValue, PersonData) => {
        console.log('Token -> ' + tokenValue)
        console.log('Data -> ', PersonData)
        setValues({ 
            ...values,
            token: tokenValue,
            person: PersonData
        });
        console.log(PersonData)
       
    }
    const populateAuthInstitution = (tokenValue, InstitutionData) => {
        setValues({ 
            ...values,
            token: tokenValue,
            institution: InstitutionData
        });
    }
    return ( 
        <AuthContext.Provider value={{ ...values, populateAuthPerson: populateAuthPerson, populateAuthInstitution: populateAuthInstitution }}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;