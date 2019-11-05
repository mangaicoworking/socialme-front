import React, { useState, useContext } from 'react';
import './style.css';
import USAFlag from './../../Assets/Flags/us.svg';
import BrazilFlag from './../../Assets/Flags/br.svg';
import PernambucoFlag from './../../Assets/Flags/Pernambuco.svg';
import { LanguageContext } from './../../Contexts/LanguageContext';

export default function SelectLanguage(props) {
    const { changeLanguage } = useContext(LanguageContext);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        flag: BrazilFlag,
        language: 'BRA'
      });
    const toggleLanguage = (newLanguage, newFlag) => {
        return(
            changeLanguage(newLanguage),
            setValues({ ...values, flag: newFlag, language: newLanguage, open: false })
        )
    }
    const languagesList = [
        {
            language : "BRA",
            flag: BrazilFlag,
            country: true
        },
        {
            language : "PE",
            flag: PernambucoFlag,
            country: false
        },
        {
            language : "USA",
            flag: USAFlag,
            country: true
        }
    ]
    const toggleOpen = () => {
        setOpen(!open);
    }
    const renderMenuDropdown = () => {
        if(open){
            return(
                <div className="selectLanguageDropdown-dropdownMenu">
                    <ul className="selectLanguageDropdown-dropdownMenu-ul">
                        {languagesList.map((item, index) => (
                            <li key={index} 
                            className={"selectLanguageDropdown-dropdownMenu-li " + (values.language === item.language ? 'selectLanguageDropdown-dropdownMenu-active' : '')}
                            onClick={() => toggleLanguage(item.language, item.flag)}
                            style={{
                                padding: (item.country ? '0px 5px' : '0px 5px 0px 20px')
                            }}
                            >
                                <img className="selectLanguageDropdown-flag" src={item.flag} alt={`${item.language} flag`} />
                                <span className="selectLanguageDropdown-span">{item.language}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }
    return (
        <>
            <div onClick={toggleOpen} className="selectLanguageDropdown">
                <div className="selectLanguageDropdown-container">
                    <img className="selectLanguageDropdown-flag" src={values.flag} alt="Bandeira do Brasil" />
                    <p className="selectLanguageDropdown-activeLanguage">{values.language}</p>
                    <i className="selectLanguageDropdown-i fas fa-chevron-down"></i>
                </div>
                
                {renderMenuDropdown()}

            </div>
        </>
    );
}