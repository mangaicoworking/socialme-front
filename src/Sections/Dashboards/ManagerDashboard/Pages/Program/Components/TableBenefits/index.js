import React from "react";
import './style.css';
import TableResponsive from './../../../../../../../Components/TabelaResponsiva';
import ImagemUser from './../../../../../../../Assets/Images/user.png'

export default function ManagerDashboardProgramTableBenefits(props) {
  //CAPITALIZE
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const valoresParaPreencherHeadDaTabela = [
    "", "Benefício", "Ofetadas", "Consumidas", "Restantes"
  ]
  const preencherNaTabela = () => {
    return(
      <tr key={1}>
        <td className="tdContainerImagem">
          <img src={`/assets/icones/servicos/bolsa-de-sangue.svg`} alt={'Foto do Benefício'} />
        </td>
        <td>{capitalizeFirstLetter('Benefício')}</td> 
        <td>180</td>
        <td>81</td>
        <td>99</td>
      </tr>
    )
  }
  return (
    <>
      <div className="managerDashboardProgramTableBenefits-generalContainer">
        <TableResponsive 
          head={valoresParaPreencherHeadDaTabela}
          registros={preencherNaTabela()}
        />
      </div>
    </>
  );
}