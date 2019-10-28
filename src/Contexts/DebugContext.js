import React, { useState, createContext } from 'react';

export const DebugContext = createContext();

const DebugContextProvider = (props) => {
    const [console] = useState({
        AuthContext: true,
        Dashboards: {
            Beneficiary:{
                MyResgister:{
                    Relantionships: true
                }
            }
        }
    });

    return ( 
        <DebugContext.Provider value={{ DebugContextConsole: console }}>
            {props.children}
        </DebugContext.Provider>
     );
}
 
export default DebugContextProvider;