import React, { useState } from 'react';
import './style.css';
import FotoDwight from './../../Assets/Images/dwight.jpg';
import FotoJim from './../../Assets/Images/jim.png';
import FotoCreed from './../../Assets/Images/creed.jpg';
import FotoAndy from './../../Assets/Images/andy.jpg';

export default function BellNotification(props) {
    const [values, setValues] = useState({
        show: false
      });
//HANDLE CHANGE
    const toogleShow = () => {
        if(values.show){
            setValues({ ...values, show: false });
        }else{
            setValues({ ...values, show: true });
        }
    };
  return (
    <>
    <div className="bellNotification">
        <i onClick={() => toogleShow()} className="far fa-bell"></i>

        <div className={"tooltip "+(values.show ? 'fadeStart-enter-active' : 'fadeStart-leave-active')}>
            <div id="heading">
            <div className="heading-left" style={{marginRight: '0'}}>
                <h6 className="heading-title">Notificações</h6>
            </div>
            <div className="heading-right">
                <a className="notification-link" href={'# '}>Ver todas</a>
            </div>
            </div>
            <ul className="notification-list">
                <li className="notification-item">
                    <div className="img-left">
                        <div className="backgroundFoto" style={{backgroundImage: `url(${FotoDwight})`}}></div>
                    </div>
                    <div className="user-content">
                        <p className="user-info"><span className="name">Dwight Schrute</span> fez alguma coisa.</p>
                        <p className="time">há 30 minutos</p>
                    </div>
                </li>
                <li className="notification-item">
                    <div className="img-left">
                        <div className="backgroundFoto" style={{backgroundImage: `url(${FotoJim})`}}></div>
                    </div>
                    <div className="user-content">
                        <p className="user-info"><span className="name">Jim Halpert</span> fez alguma coisa.</p>
                        <p className="time">há 1 hora</p>
                    </div>
                </li>
                <li className="notification-item">
                    <div className="img-left">
                        <div className="backgroundFoto" style={{backgroundImage: `url(${FotoAndy})`}}></div>
                    </div>
                    <div className="user-content">
                        <p className="user-info"><span className="name">Andy Bernard</span> fez alguma coisa.</p>
                        <p className="time">há 2 horas</p>
                    </div>
                </li>
                <li className="notification-item">
                    <div className="img-left">
                        <div className="backgroundFoto" style={{backgroundImage: `url(${FotoCreed})`}}></div>
                    </div>
                    <div className="user-content">
                        <p className="user-info"><span className="name">Creed Bratton</span> fez alguma coisa.</p>
                        <p className="time">há 3 horas</p>
                    </div>
                </li>
            </ul>
        </div>

    </div>

  {/*  <i className="far fa-bell"></i> */}
        
    </>
  );
}

/* 
<div className="bellNotification">
    <a href="#" onClick={() => toogleShow()} className="tooltip-bell">
      <i className="far fa-2x fa-bell"></i>
      <span id="circle"></span>
    </a>
      <div className={"tooltip"}>
        <div id="heading">
          <div className="heading-left">
            <h6 className="heading-title">Notifications</h6>
          </div>
          <div className="heading-right">
            <a className="notification-link" href="#">See all</a>
          </div>
        </div>
        <ul className="notification-list">
          <li className="notification-item">
            <div className="img-left">
              <img className="user-photo" alt="User Photo"/>
            </div>
            <div className="user-content">
              <p className="user-info"><span className="name">Nome Completo</span> left a comment.</p>
              <p className="time">1 hour ago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>


*/