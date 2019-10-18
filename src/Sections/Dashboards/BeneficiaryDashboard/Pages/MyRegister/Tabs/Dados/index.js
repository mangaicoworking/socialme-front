import React, { useState, useEffect } from "react";
import './style.css';
import api from './../../../../../../../Services/api';
import CircularProgress from './Components/CircularProgress';
//import TabCamposPessoais from './Components/CamposDadosPessoais';
//import TabCamposEndereco from './Components/CamposDadosEndereco';

//TABS
const beneficiaryMeuCadastroDados = [
  {
    "icone" : "fas fa-user-lock",
    "titulo" : "Pessoais",
    "slug" : "pessoais"
  },
  {
    "icone" : "fas fa-map-marker-alt",
    "titulo" : "Endereço",
    "slug" : "endereco"
  }
]

export default function DashboardBeneficiaryMeuCadastroDados() {
  const [values, setValues] = useState({
    userId: '5d9ca0e96ca01a3818444728',
    componenteMontado: false,
    quantidadeDeItensNasTabs : beneficiaryMeuCadastroDados.length,
    tamanhoSlider: 0,
    translateSlider: 0,
    activeTab: 'Pessoais',
    //Dados
    dadosDaPessoa: [],
    nome: '',
    nomeSocial: '',
    sexo: '',
    generoSocial: '',
    estadoCivil: '',
    dataDeNascimento: '',
    dataDeFalecimento: '',
    cpf: '',
    cns: '',
    pis: '',
    rg: '',
    escolaridade: '',
    profissao: '',
    telefoneFixo: '',
    telefoneCelular: '',
    email: '',
    //Nascimento
    dataNascimento: '',
    nacionalidade: '',
    paisNascimento: '',
    estadoNascimento: '',
    cidadeNascimento: '',
    //Endereço
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estadoProvincia: '',
    pais: '',
    cep: '',
    lat: '',
    lgn: '',
    inscricaoImobiliaria: '',
    complemento: '',
    //Outros
    beneficiaria: false,
    doadora: false,
    fornecedora: false,
    //FUNÇÕES
    popoverDoCampoSexoOutro: false, 
  });
//HANDLE CHANGE
const handleChange = name => event => {
  setValues({ ...values, [name]: event.target.value });
};
//PEGA DADOS DA PESSOA DA API
  useEffect(() => {
    api.get(`/pessoa/${values.userId}`)
    .then(res => {
      console.log(res.data);
      if(res.data.codigo === 'CODIGOPESSOAENCONTADA'){
        const dados = res.data.pessoa.dados;
        const nascimento = res.data.pessoa.dados.nascimento;
        const endereco = res.data.pessoa.dados.endereco;
        setValues({ 
          ...values, 
          dadosDaPessoa: res.data.pessoa,
          nome: dados.nome,
          nomeSocial: dados.nomeSocial,
          sexo: dados.sexo,
          generoSocial: dados.generoSocial,
          estadoCivil: dados.estadoCivil,
          dataDeFalecimento: dados.dataDeFalecimento,
          cpf: dados.cpf,
          cns: '',
          pis: '',
          rg: '',
          escolaridade: dados.escolaridade,
          profissao: dados.profissao,
          telefoneFixo: '',
          telefoneCelular: '',
          email: dados.email,
          //Nascimento
          dataNascimento: nascimento.data,
          nacionalidade: nascimento.nacionalidade,
          paisNascimento: nascimento.paisNascimento,
          estadoNascimento: nascimento.estadoNascimento,
          cidadeNascimento: nascimento.cidadeNascimento,
          //Endereço
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estadoProvincia: endereco.estadoProvincia,
          pais: endereco.pais,
          cep: endereco.cep,
          lat: endereco.lat,
          lng: endereco.lng,
          inscricaoImobiliaria: endereco.inscricaoImobiliaria,
          complemento: endereco.complemento
        });
      }
    })
    .catch(function (error) {
        console.log(error);
    })
  }, []);

  useEffect(
    // Effect from first render
    () => {
      return () => {
        console.log('teste2')
      };
    }
  );
//ARRUMA TAMANHO DO SLIDER
  useEffect(() => {
    let valor = 100/values.quantidadeDeItensNasTabs;
    setValues({ ...values, tamanhoSlider: valor });
  }, []);
//TOGGLE TAB ATIVA
  const toogleActiveTab = (tabClicada) => {
    for (let i = 0; i < beneficiaryMeuCadastroDados.length; i++){
      if(beneficiaryMeuCadastroDados[i].titulo === tabClicada){
        let valorTranslate = i*100;
        setValues({ ...values, activeTab: tabClicada, translateSlider: valorTranslate });
        break;
      }
    }
  }
//RENDERIZA O CONTEÚDO DA TAB
  const renderContentTab = () => {
    switch (values.activeTab) {
      case 'Pessoais':
      default:
        return <TabCamposPessoais values={values} />;
      case 'Endereço':
          return <TabCamposEndereco />;
    }
  }
//POPOVER SEXO OUTRO
  const ativaPopoverSexoOutro = () => {
    setValues({ ...values, popoverDoCampoSexoOutro: true, sexo: 'Outro' });
  }
  const desativaPopoverSexoOutro = () => {
    setValues({ ...values, popoverDoCampoSexoOutro: false });
  }
//FORMS DOS CAMPOS PESSOAIS
  const TabCamposPessoais = () => {
    return(
      <>
        <div className="row">
          {/* NOME */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder="Digite seu nome completo"
                value={values.nome}
                onChange={handleChange('nome')}
              />
            </div>
          </div>
          {/* SEXO */}
          <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <div className="form-label">Sexo</div>
                <div className="containerCheckBox">
                  <label className="custom-control custom-radio custom-control-inline">
                    <input 
                      type="checkbox" 
                      className="custom-control-input"
                      checked={values.sexo === 'Feminino' ? true : false}
                      value="Feminino"
                      onChange={handleChange('sexo')} 
                    />
                    <span className="custom-control-label">Feminino</span>
                  </label>
                  <label className="custom-control custom-radio custom-control-inline">
                  <input 
                      type="checkbox" 
                      className="custom-control-input"
                      checked={values.sexo === 'Masculino' ? true : false}
                      value="Masculino"
                      onChange={handleChange('sexo')} 
                    />
                    <span className="custom-control-label">Masculino</span>
                  </label>
                  <label className="custom-control custom-radio custom-control-inline">
                    <input 
                      type="checkbox" 
                      className="custom-control-input"
                      checked={values.sexo === 'Outro' ? true : false}
                      value="Outro"
                      onChange={handleChange('sexo')}
                      onFocus={() => ativaPopoverSexoOutro()}
                    />
                    <div className={"Popover Popover--top js-popover "+(values.popoverDoCampoSexoOutro ? 'is-visible' : '')}>
                        <p>Com qual identidade de gênero você se identifica?</p>
                        <button onClick={() => desativaPopoverSexoOutro()}>FECHAR</button>
                    </div>
                    <span className="custom-control-label">Outro</span>
                  </label>
                </div>
              </div>
            </div>
          {/* NOME SOCIAL */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Nome Social</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder="Digite seu nome completo"
                value={values.nomeSocial}
                onChange={handleChange('nomeSocial')}
              />
            </div>
          </div>
          {/* GENERO SOCIAL */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Genero Social</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder="Digite seu nome completo"
                value={values.generoSocial}
                onChange={handleChange('generoSocial')}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label className="form-label">Estado Civil</label>
                <select 
                  className="form-control"
                  value={values.estadoCivil}
                  onChange={handleChange('estadoCivil')}
                >
                  <option value="">Selecione...</option>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                  <option value="Separado(a) Judicialmente">Separado(a) Judicialmente</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                </select>
              </div>
            </div>
          {/* CPF */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">CPF</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.cpf}
                onChange={handleChange('cpf')}
              />
            </div>
          </div>
          {/* CNS */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">CNS</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.cns}
                onChange={handleChange('cns')}
              />
            </div>
          </div>
          {/* PIS */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">PIS</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.pis}
                onChange={handleChange('pis')}
              />
            </div>
          </div>
          {/* RG */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">RG</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.rg}
                onChange={handleChange('rg')}
              />
            </div>
          </div>
          {/* ESCOLARIDADE */}
          <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label className="form-label">Escolaridade</label>
                <select 
                  className="form-control"
                  value={values.escolaridade}
                  onChange={handleChange('escolaridade')}
                >
                  <option value="">Selecione...</option>
                  <option value="Analfabeto">Analfabeto</option>
                  <option value="Ensino fundamental incompleto">Ensino fundamental incompleto</option>
                  <option value="Ensino fundamental completo">Ensino fundamental completo</option>
                  <option value="Ensino médio incompleto">Ensino médio incompleto</option>
                  <option value="Ensino médio completo">Ensino médio completo</option>
                  <option value="Superior completo">Superior completo</option>
                  <option value="Pós-graduação">Pós-graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                  <option value="Pós-Doutorado">Pós-Doutorado</option>
                </select>
              </div>
            </div>
          {/* Profissão */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Profissão</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.profissao}
                onChange={handleChange('profissao')}
              />
            </div>
          </div>
          {/* Telefone Fixo */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Telefone Fixo</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.telefoneFixo}
                onChange={handleChange('telefoneFixo')}
              />
            </div>
          </div>
          {/* Telefone Celular */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Telefone Celular</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.telefoneCelular}
                onChange={handleChange('telefoneCelular')}
              />
            </div>
          </div>
          {/* Email */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.email}
                onChange={handleChange('email')}
              />
            </div>
          </div>
          {/* Nascimento */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="form-group">
              <label className="form-label">Nascimento</label>
              <input 
                type="text" 
                className="form-control input-text" 
                placeholder=""
                value={values.dataDeNascimento}
                onChange={handleChange('dataDeNascimento')}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
//FORMS DOS CAMPOS DE ENDEREÇO
  const TabCamposEndereco= () => {
    return(
      <div className="row">
        {/* Logradouro */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Logradouro</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.logradouro}
              onChange={handleChange('logradouro')}
            />
          </div>
        </div>
        {/* Número */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Número</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.bairro}
              onChange={handleChange('bairro')}
            />
          </div>
        </div>
        {/* Bairro */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Bairro</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.bairro}
              onChange={handleChange('bairro')}
            />
          </div>
        </div>
        {/* Cidade */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Cidade</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.cidade}
              onChange={handleChange('cidade')}
            />
          </div>
        </div>
        {/* Estado Provincia */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Estado Provincia</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.estadoProvincia}
              onChange={handleChange('estadoProvincia')}
            />
          </div>
        </div>
        {/* País */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">País</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.pais}
              onChange={handleChange('pais')}
            />
          </div>
        </div>
        {/* CEP */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">CEP</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.cep}
              onChange={handleChange('cep')}
            />
          </div>
        </div>
        {/* Latitude */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Latitude</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.lat}
              onChange={handleChange('lat')}
            />
          </div>
        </div>
        {/* Longitude */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Longitude</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.lgn}
              onChange={handleChange('lgn')}
            />
          </div>
        </div>
        {/* Inscrição Imobiliária */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Inscrição Imobiliária</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.inscricaoImobiliaria}
              onChange={handleChange('inscricaoImobiliaria')}
            />
          </div>
        </div>
        {/* Complemento */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="form-group">
            <label className="form-label">Complemento</label>
            <input 
              type="text" 
              className="form-control input-text" 
              placeholder=""
              value={values.complemento}
              onChange={handleChange('complemento')}
            />
          </div>
        </div>
      </div>
    )
  }
//ATUALIZA OS DADOS
  const atualizarOsDados = () => {
    console.log('Atualiza')
    }; 

//RETURN
  return (
    <>
        <div className="dashboardBeneficiaryMeuCadastroo">
        <div className="col-sm-12 col-md-12 col-lg-12">
          {values.dadosDaPessoa.porcentagemCadastro > 0 ?
            <CircularProgress progresso={values.dadosDaPessoa.porcentagemCadastro} />
          :
            <CircularProgress progresso={0} />
          }
          
        </div>
          <div className="beneficiaryMeuCadastroDadosTabs">
              <ul className="beneficiaryMeuCadastroDadosTabs-ul">
                {beneficiaryMeuCadastroDados.map(item => 
                  <li
                    key={item.slug}
                    className={"beneficiaryMeuCadastroDadosTabs-li"}
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

          <button onClick={() => atualizarOsDados()} className="btn btn-primary">Salvar Alterações</button>

        </div>
    </>
  );
}