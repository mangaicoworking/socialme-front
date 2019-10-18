import React from 'react';
import './style.css';
import Accordion from './../../../../../Components/Accordion';

export default function ManagerDashboardFQA() {
  return (
    <>
      <div className="painelGestoraDuvidas-container">
        <h1>Dúvidas Frequentes</h1>
        <Accordion />
      </div>
    </>
  );
}