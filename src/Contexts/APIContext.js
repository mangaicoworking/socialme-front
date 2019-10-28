import React, { createContext, useEffect } from 'react';
import axios from 'axios';

export const APIContext = createContext();

const APIContextProvider = (props) => {

    const baseURL = 'http://192.168.2.28:3000/ergCNTis';
    let token = localStorage.getItem('token');
    
    const api = () =>{
        const teste = 'teste';
        return teste
    }

    const axiosCriado = axios.create({ 
        baseURL: baseURL,
        headers: {'mundo-data-token': token}
    });

    return ( 
        <APIContext.Provider value={{ api }}>
            {props.children}
        </APIContext.Provider>
     );
}
 
export default APIContextProvider;