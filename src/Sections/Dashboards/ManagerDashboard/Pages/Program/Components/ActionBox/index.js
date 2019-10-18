import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function ManagerDashboardProgramActionBox(props) {
  return (
    <>
      <Link to={props.url}>
        <div className="managerDashboardProgram-information-actionsContainer">
          <div className="managerDashboardProgram-information-actionBox">
            <p>{props.titulo}</p>
          </div>
        </div> 
      </Link>
    </>
  );
}