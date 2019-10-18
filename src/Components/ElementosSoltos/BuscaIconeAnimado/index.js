import React from 'react';
import './style.css';

export default function IconeBuscaAnimado(props) {
  return (
    <>
        <div class='column'>
            <div class='search'>
                <div class='search_bar'>
                <input id='searchOne' type='checkbox'/>
                <label htmlFor='searchOne'>
                    <i class="icon fas fa-search"></i>
                    <i class="last icon fas fa-times"></i>
                    <p>|</p>
                </label>
                <input placeholder='Search...' type='text'/>
                </div>
            </div>
        </div>
    </>
  );
}