import React, { useState, createContext } from 'react';

export const DebugContext = createContext();

const DebugContextProvider = (props) => {
    const [debug] = useState({
        console: true
    });
    const DebugConsole = (valueConsole, object) => {
        if(debug.console){
            if(object){
                return console.log(valueConsole, object);
            }else{
                return console.log(valueConsole);
            }
            
        }
    }
    return ( 
        <DebugContext.Provider value={{ DebugConsole: DebugConsole }}>
            {props.children}
        </DebugContext.Provider>
     );
}
 
export default DebugContextProvider;