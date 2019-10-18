import React, { useState, useEffect } from "react";
import './style.css';
import TabDados from './Tabs/Dados';
import TabRelacionamentos from './Tabs/Relacionamentos';

const beneficiaryMeuCadastroItensDoMenu = [
  {
    "icone" : "fas fa-user-edit",
    "titulo" : "Dados",
    "slug" : "dados"
  },
  {
    "icone" : "fas fa-user-friends",
    "titulo" : "Relações",
    "slug" : "relacoes"
  }
]

export default function DashboardBeneficiaryMeuCadastro() {
  const [values, setValues] = useState({
    quantidadeDeItensNasTabs : beneficiaryMeuCadastroItensDoMenu.length,
    tamanhoSlider: 0,
    translateSlider: 0,
    activeTab: 'Relações'
  });

  useEffect(() => {
    let valor = 100/values.quantidadeDeItensNasTabs;
    setValues({ ...values, tamanhoSlider: valor });
  }, []);

  const toogleActiveTab = (tabClicada) => {
    for (let i = 0; i < beneficiaryMeuCadastroItensDoMenu.length; i++){
      if(beneficiaryMeuCadastroItensDoMenu[i].titulo === tabClicada){
        let valorTranslate = i*100;
        setValues({ ...values, activeTab: tabClicada, translateSlider: valorTranslate });
        break;
      }
    }
  }

  const renderContentTab = () => {
    switch (values.activeTab) {
      case 'Dados':
        return <TabDados />;
      case 'Relações':
          return <TabRelacionamentos />;
      default:
        return <TabDados />
    }
  }

  return (
    <>
      <div className="dashboardBeneficiaryMeuCadastro">
        <div className="beneficiaryMeuCadastroTabs">
            <ul className="beneficiaryMeuCadastroTabs-ul">
              {beneficiaryMeuCadastroItensDoMenu.map(item => 
                <li
                  key={item.slug}
                  className={"beneficiaryMeuCadastroTabs-li"}
                  onClick={() => toogleActiveTab(item.titulo)}
                >
                  <label className={""+(values.activeTab === item.titulo ? 'active' : '')}>
                  <i className={item.icone}></i>
                  <span>{item.titulo}</span>
                  </label>
                </li>
              )}
            </ul>
        </div>

        {renderContentTab()}

      </div>
    </>
  );
}