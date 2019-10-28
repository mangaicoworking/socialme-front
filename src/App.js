import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes'; // where we are going to specify our routes
import './App.css';

import APIContextProvider from './Contexts/APIContext';
import DebugContextProvider from './Contexts/DebugContext';
import ThemeContextProvider from './Contexts/ThemeContext';
import LanguageContextProvider from './Contexts/LanguageContext';
import AuthContextProvider from './Contexts/AuthContext';

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';

import AOS from 'aos';
import 'aos/dist/aos.css';
import 'moment/locale/pt-br';

Moment.globalMoment = moment;
Moment.globalLocale = 'pt-br';

AOS.init();



export default function AppWeb( ) {
  return (
    <>
      <Router>
      <APIContextProvider>
          <DebugContextProvider>
            <AuthContextProvider>
              <ThemeContextProvider>
                <LanguageContextProvider>
                  <Routes/>
                </LanguageContextProvider>
              </ThemeContextProvider>
            </AuthContextProvider>
          </DebugContextProvider>
        </APIContextProvider>
      </Router>
    </>
  );
}