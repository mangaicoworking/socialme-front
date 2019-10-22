import React, { useState, useContext, createContext, useEffect } from 'react';
import api from './../Services/api';
import { DebugContext } from './../Contexts/DebugContext';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const { DebugContextConsole } = useContext(DebugContext);
    const DebugConsole = DebugContextConsole.AuthContext;

    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
    const [token, setToken] = useState();
    const [person, setPerson] = useState();
    const [institution, setInstitution] = useState();

    useEffect(() => {
        let tokenLocalStorage = localStorage.getItem('token');
        if(tokenLocalStorage){
            if(DebugConsole){console.log('Token found in LocalStorage')};
            const obj = {
                'mundo-data-token' : tokenLocalStorage
            }
            if(DebugConsole)console.log('Query API on route -> /checkToken');
            //Token Valid : ABF5400000AF71E
            //Token Invalid : 4F4CEC37FF7AEFC
            api.post('/checkToken', obj)
            .then(res => {
                if(DebugConsole)console.log('API answer for /checkToken -> ', res);
                switch(res.data.header.code){
                    case 'ABF5400000AF71E':
                        if(res.data.data.person){
                            setPerson(res.data.data.person);
                            setIsAuth(true);
                            if(DebugConsole)console.log('Person Data -> ', res.data.data.person);
                        }else if(res.data.data.institution){
                            setInstitution(res.data.data.institution);
                            setIsAuth(true);
                            if(DebugConsole)console.log('Institution Data -> ', res.data.data.institution);
                        }
                        break;
                    default:
                        return;
                }
            })
            .catch(function (error) {
                if(DebugConsole)console.log('API answer for /checkToken -> ', error);
                setIsAuth(false);
                localStorage.clear();
            })
        }else{
            if(DebugConsole)console.log('Token not found in LocalStorage');
        }
    }, [token])

    useEffect(() => {
        if(person){
            if(DebugConsole)console.log('Person Found: ', person);
        }
    }, [person])

    useEffect(() => {
        if(institution){
            console.log('INSTITUTION!!! -> ', institution);
        }
    }, [institution])

    const populateAuth = (tokenValue, UserData, type) => {
        localStorage.setItem('token', tokenValue);
        localStorage.setItem('isAuth', true);
        setToken(tokenValue);
        switch(type){
            case 'person':
                return setPerson(UserData);
            case 'institution':
                return setInstitution(UserData);
            default:
                return;
        } 
    }

    const logout = () => {
        localStorage.clear();
    }

    return ( 
        <AuthContext.Provider value={{ token, person, institution, isAuth, populateAuth: populateAuth, logout: logout }}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;