import React, { useState, useEffect } from "react";
import './style.css';
import TabAtividades from './Tabs/Atividades';
import TabTiposDeAtividades from './Tabs/TiposDeAtividades';
import TabProdutos from './Tabs/Produtos';
import TabServicos from './Tabs/Servicos';

const painelDaGestoraModuloGestorDeBeneficiosMenuItens = [
  {
    "icone" : "fas fa-theater-masks",
    "titulo" : "Atividades",
    "slug" : "atividades"
  },
  {
    "icone" : "fas fa-theater-masks",
    "titulo" : "Tipos de Atividades",
    "slug" : "tipos-de-atividades"
  },
  {
    "icone" : "fas fa-shopping-basket",
    "titulo" : "Produtos",
    "slug" : "produtos"
  },
  {
    "icone" : "fas fa-pills",
    "titulo" : "Serviços",
    "slug" : "servicos"
  }
]

export default function PainelGestoraGestorDeBeneficios() {
  const [values, setValues] = useState({
    activeTab: 'Atividades'
  });

  useEffect(() => {
    let valor = 100/values.quantidadeDeItensNasTabs;
    setValues({ ...values, tamanhoSlider: valor });
  }, []);

  const toogleActiveTab = (tabClicada) => {
    for (let i = 0; i < painelDaGestoraModuloGestorDeBeneficiosMenuItens.length; i++){
      if(painelDaGestoraModuloGestorDeBeneficiosMenuItens[i].titulo === tabClicada){
        let valorTranslate = i*100;
        setValues({ ...values, activeTab: tabClicada, translateSlider: valorTranslate });
        break;
      }
    }
  }

  const renderContentTab = () => {
    switch (values.activeTab) {
      case 'Atividades':
      default:
        return <TabAtividades />;
      case 'Tipos de Atividades':
        return <TabTiposDeAtividades />;
      case 'Produtos':
          return <TabProdutos />;
      case 'Serviços':
        return <TabServicos />;
    }
  }

  return (
    <>
      <div className="painelGestoraGestaoDeBeneficios">
        <div className="gestoraGestorDeBeneficiosTabs">
            <ul className="gestoraGestorDeBeneficiosTabs-ul">
              {painelDaGestoraModuloGestorDeBeneficiosMenuItens.map(item => 
                <li
                  key={item.slug}
                  className={"gestoraGestorDeBeneficiosTabs-li"}
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