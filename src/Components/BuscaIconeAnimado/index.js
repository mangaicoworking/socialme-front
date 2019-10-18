import React from 'react';
import './style.css';

export default function BuscaIconeAnimado(props) {
  return (
    <>
        <div className='buscaIconeAnimado-container'>
          <div className='buscaIconeAnimado'>
            <div className='buscaIconeAnimado-bar'>
              <input id='buscaIconeAnimado-label' type='checkbox'/>
              <label htmlFor='buscaIconeAnimado-label'>
                  <i className="icon fas fa-search"></i>
                  <i className="last icon fas fa-times"></i>
                  <p>|</p>
              </label>
              <input placeholder='Buscando por...' type='text'/>
            </div>
          </div>
        </div>
    </>
  );
}