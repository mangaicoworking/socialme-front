import React, { useState, createContext } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [values, setValues] = useState({
        isLightTheme: false
    })
    const toggleTheme = () => {
        setValues({ isLightTheme: !values.isLightTheme });
    }
    return ( 
        <ThemeContext.Provider value={{ ...values, toggleTheme: toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
     );
}
 
export default ThemeContextProvider;