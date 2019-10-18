import React from 'react';
import './style.css';
import Card from './../Card';

export default function ManagerDashboardProgramsContainerCards(props) {
  return (
    <>
        <div className="managerDashboardProgramsContainerCards-containerGeral">
            <div className="row">
                {props.todosOsProgramas.map((item, index) =>
                    <div key={index} className="col-md-6">
                        <Card programa={item} />
                    </div>
                )}
            </div>
        </div>
    </>
  );
}