import React from 'react';
import './style.css';
import Unauthenticated from './Types/Unauthenticated';
import Authenticated from './Types/Authenticated';
import Simple from './Types/Simple';

export default function Navbar(props) {
  const isAuth = localStorage.getItem('isAuth');

  if (props.path === '/entrar'){
    return (
      <Simple />
    );
  }else if(isAuth){
    return(
      <Authenticated />
    )
  }else{
    return(
      <Unauthenticated />
    )
  }
}