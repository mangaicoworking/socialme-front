import React, { useState, useEffect } from "react";
import './style.css';
import api from './../../../../../../../Services/api';
import ImageUser from './../../../../../../../Assets/Images/user.png';
import ImageAdd from './../../../../../../../Assets/Images/add.png';
import ImageCircle from './../../../../../../../Assets/Images/circle.png';
import Alert from './../../../../../../../Components/Alert';

export default function DashboardBeneficiaryMeuCadastroRelacionamento() {
  const [values, setValues] = useState({
    userId: '5d9ca0e96ca01a3818444728',
    todosOsRelacionamentos: [],
    idDaRowEmEdicao: '',
    tipoDoRelacionamentoDaEdicao: '',
    mostrarFormAddRelacionamento: false,
    cpfDoNovoRelacionamento: '', /* 02713530237 */
    nomedaPessoaDoNovoRelacionamento: '',
    idDaPessoaDoNovoRelacionamento: '',
    tipoDoNovoRelacionamento: '',
    auxPegarDados: false,
    //Alerta
    mostrarAlerta: false,
    typeAlerta: 'success',
    positionAlert: 'top-right',
    textAlert: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium est sit amet erat egestas vulputate.'
  });
//HANDLE CHANGE
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
//BUSCA UM NOVO RELACIONAMENTO (CPF COM 11 DIGITOS)
  useEffect(() => {
    if(values.cpfDoNovoRelacionamento.length === 11){
      api.get(`buscarParaRelacionamento/${values.userId}/${values.cpfDoNovoRelacionamento}`)
      .then(res => {
        //console.log(res);
        setValues({ 
          ...values, 
          nomedaPessoaDoNovoRelacionamento: res.data.pessoa.dados.nome,
          idDaPessoaDoNovoRelacionamento: res.data.pessoa._id 
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }, [values.cpfDoNovoRelacionamento]);
//TESTE
useEffect(() => {
}, [values.mostrarFormAddRelacionamento]);
useEffect(() => {
  if(values.auxPegarDados){
    setValues({ 
      ...values, 
      mostrarAlerta: false
    });
    pegandoDadosDaAPI();
  }
}, [values.auxPegarDados]);
//CHAMA A PRIMEIRA VEZ
useEffect(() => {
  //console.log('useEffect -> Pegar Dados da API');
  pegandoDadosDaAPI();
}, []);
//PEGA OS DADOS DA API
  const pegandoDadosDaAPI = () => {
    //console.log('LISTANDO');
    api.get(`relacionamentos/${values.userId}`)
    .then(res => {
      console.log(res.data);
      setValues({ 
        ...values, 
        todosOsRelacionamentos: res.data.relacionamentos,
        mostrarFormAddRelacionamento: false
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
//ADICIONANDO RELACIONAMENTO
  const addRelacionamento = () => {
    setValues({ ...values, auxPegarDados: false });
    console.log('ADICIONANDO');
    const obj = {
      _idSolicitante: values.userId,
      _idPessoa: values.idDaPessoaDoNovoRelacionamento,
      vinculo: values.tipoDoNovoRelacionamento
    };
    api.post(`relacionamento`,obj)
    .then(res => {
      console.log('Enviando Obj');
      console.log(res.data);
      switch (res.data.codigo) {
        case 'CODIGOTUDOOK':
          return(
            setValues({ 
              ...values, 
              idDaRowEmEdicao: '',
              tipoDoNovoRelacionamento: '',
              mostrarAlerta: true,
              typeAlerta: 'success',
              positionAlert: 'top-right',
              textAlert: 'Relacionamento alterado com Sucesso',
              auxPegarDados: true
            })
          );
        case 'CDIGOTUDOOK':
        default:
          return(
            setValues({ 
              ...values,
              cpfDoNovoRelacionamento: '',
              nomedaPessoaDoNovoRelacionamento: '',
              idDaPessoaDoNovoRelacionamento: '',
              tipoDoNovoRelacionamento: '',
              mostrarFormAddRelacionamento: false,
              mostrarAlerta: true,
              typeAlerta: 'success',
              positionAlert: 'top-right',
              textAlert: 'Relacionamento criado com sucesso',
              auxPegarDados: true,
            })
          );
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
//CANCELANDO ATUALIZAÇÃO
  const cancelandoAdicao = () => {
    setValues({ 
      ...values, 
      mostrarFormAddRelacionamento: false,
      cpfDoNovoRelacionamento: '',
      nomedaPessoaDoNovoRelacionamento: '',
      idDaPessoaDoNovoRelacionamento: '',
      tipoDoNovoRelacionamento: ''
    });
  }
//DELETANDO RELACIONAMENTO
  const deletarRelacionamento = (idDoRelacionamento) => {
    console.log('DELETANDO');
    setValues({ ...values, auxPegarDados: false });
    api.delete(`removerRelacionamento/${values.userId}/${idDoRelacionamento}`)
    .then(res => {
      console.log(res.data);
      if(res.data.codigo === 'CODIGOOK'){
        setValues({ 
          ...values, 
          mostrarAlerta: true,
          typeAlerta: 'success',
          positionAlert: 'top-right',
          textAlert: 'Relacionamento deletado com sucesso',
          auxPegarDados: true
        });
        console.log('DELETADO');
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
//ATUALIZANDO RELACIONAMENTO
  const atualizarRelacionamento = () => {
    setValues({ ...values, auxPegarDados: false });
    //console.log('ATUALIZANDO');
    const obj = {
      vinculo: values.tipoDoRelacionamentoDaEdicao
    };
    api.put(`atualizarRelacionamento/${values.userId}/${values.idDaRowEmEdicao}`,obj)
    .then(res => {
      switch (res.data.codigo) {
        case 'CODIGOTUDOOK':
        default:
          return(
            setValues({ 
              ...values, 
              idDaRowEmEdicao: '',
              tipoDoNovoRelacionamento: '',
              mostrarAlerta: true,
              typeAlerta: 'success',
              positionAlert: 'top-right',
              textAlert: 'Relacionamento alterado com Sucesso',
              auxPegarDados: true
            })
          );
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
//CANCELANDO ATUALIZAÇÃO
  const cancelandoAtualizacao = () => {
    setValues({ 
      ...values, 
      mostrarFormAddRelacionamento: false,
      idDaRowEmEdicao: '', 
      tipoDoRelacionamentoDaEdicao: ''
    });
  }
//MOSTRA O NOME DA PESSOA DA CONSULTA
  const renderNomeDaConsulta = () => {
    return(
      <div className="form-group">
        <p>{values.nomedaPessoaDoNovoRelacionamento}</p>
      </div>
    )
  }
//TOGGLE DO FORM DE RELACIONAMENTO
  const toggleMostrarFormAddRelacionamento = () => {
    console.log('TOGGLE FORM ADICIONAR')
    if(values.mostrarFormAddRelacionamento){
      setValues({ ...values, mostrarFormAddRelacionamento: false, idDaRowEmEdicao: '' });
    }else{
      setValues({ ...values, mostrarFormAddRelacionamento: true, idDaRowEmEdicao: '' });
    }
  }
//TOGGLE DO FORM DE RELACIONAMENTO
const toggleRowEditarRelacionamento = (idDaRowEmEdicao, vinculo) => {
  console.log('TOGGLE FORM EDIÇÃO')
  setValues({ ...values, mostrarFormAddRelacionamento: false, idDaRowEmEdicao: idDaRowEmEdicao, tipoDoRelacionamentoDaEdicao: vinculo });
}
//RENDERIZA A LINHA PARA ADICIONAR NOVOS RELACIONAMENTOS
  const renderRowAdicionaRelacionamento = () => {
    return (
      <>
        <li onClick={() => toggleMostrarFormAddRelacionamento()} className="dashboardBeneficiaryMeuCadastroRelacionamento-li">
          <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-imgContainer">
            <img src={ImageAdd} alt="Imagem padrão de usuário" />
          </div>
          <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-addText">
            <p>Adicionar um membro da família</p>
          </div>
        </li>
        <div className={"drawer-out "+(values.mostrarFormAddRelacionamento ? 'opencan' : '')}>
          <div className="drawer">
            <li className="dashboardBeneficiaryMeuCadastroRelacionamento-li-addRelacionamento">
              <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-imgContainer">
                {values.nomedaPessoaDoNovoRelacionamento.length > 2 ?
                  <img src={ImageUser} alt="Imagem padrão de usuário" />
                :
                  <img src={ImageCircle} alt="Imagem padrão de usuário" />
                }
              </div>
              {renderNomeDaConsulta()}
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control input-text" 
                  placeholder="Digite o CPF da pessoa"
                  value={values.cpfDoNovoRelacionamento}
                  onChange={handleChange('cpfDoNovoRelacionamento')}
                />
              </div>
              <div className="form-group">
                <select 
                  className="form-control"
                  value={values.tipoDoNovoRelacionamento}
                  onChange={handleChange('tipoDoNovoRelacionamento')}
                >
                  <option value="">Selecione um relacionamento</option>
                  <option value="PAI">Pai</option>
                  <option value="MÃE">Mãe</option>
                  <option value="FILHO">Filho</option>
                  <option value="FILHA">Filha</option>
                  <option value="AVÔ">Avô</option>
                  <option value="AVÓ">Avó</option>
                  <option value="NETO">Neto</option>
                  <option value="NETA">Neta</option>
                  <option value="BISAVÔ">Bisavô</option>
                  <option value="BISAVÓ">Bisavó</option>
                  <option value="BISNETO">Bisneto</option>
                  <option value="BISNETA">Bisneta</option>
                  <option value="NOIVO">Noivo</option>
                  <option value="NOIVA">Noiva</option>
                  <option value="MARIDO">Marido</option>
                  <option value="ESPOSA">Esposa</option>
                </select>
              </div>
              <button onClick={() => addRelacionamento()} className="btn btn-primary btn-AddRelacionamento">Salvar Alterações</button>
              <button onClick={() => cancelandoAdicao()} className="btn btn-primary">Cancelar</button>
            </li>
          </div>
        </div>
      </>
    )
  }
//RENDERIZA A LINHA PARA ADICIONAR NOVOS RELACIONAMENTOS
const renderRowsDosRelacionamentos= (item) => {
  const arrayDosRelacionamentos = values.todosOsRelacionamentos;
  return (
    <>
      {arrayDosRelacionamentos.map(item =>
        <li key={item._id} className="dashboardBeneficiaryMeuCadastroRelacionamento-li">
          {values.idDaRowEmEdicao === item._id ?
            <>
            <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-edicao">
          <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-imgContainer">
            <img src={ImageUser} alt="Imagem padrão de usuário" />
          </div>
          <div className="form-group">
            <p>{item.nome}</p>
          </div>
          <div className="form-group">
            <select 
              className="form-control"
              value={values.tipoDoRelacionamentoDaEdicao}
              onChange={handleChange('tipoDoRelacionamentoDaEdicao')}
            >
              <option value="">Selecione um relacionamento</option>
              <option value="PAI">Pai</option>
              <option value="MÃE">Mãe</option>
              <option value="FILHO">Filho</option>
              <option value="FILHA">Filha</option>
              <option value="AVÔ">Avô</option>
              <option value="AVÓ">Avó</option>
              <option value="NETO">Neto</option>
              <option value="NETA">Neta</option>
              <option value="BISAVÔ">Bisavô</option>
              <option value="BISAVÓ">Bisavó</option>
              <option value="BISNETO">Bisneto</option>
              <option value="BISNETA">Bisneta</option>
              <option value="NOIVO">Noivo</option>
              <option value="NOIVA">Noiva</option>
              <option value="MARIDO">Marido</option>
              <option value="ESPOSA">Esposa</option>
            </select>
          </div>
          <button onClick={() => atualizarRelacionamento(item._id)} className="btn btn-primary">Salvar Alterações</button>
          <button onClick={() => cancelandoAtualizacao()} className="btn btn-primary">Cancelar</button>
          </div>
          </>
          :
            <>
          <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-imgContainer">
            <img src={ImageUser} alt="Imagem padrão de usuário" />
          </div>
          <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-containerInfo">
            <p>{item.nome} <span>(pendente)</span></p>
            <span>{item.vinculo}</span>
          </div>
          <div className="dashboardBeneficiaryMeuCadastroRelacionamento-buttonsActions">
            <button onClick={() => toggleRowEditarRelacionamento(item._id, item.vinculo)} className="btn btn-transparent btn-transparent-primary">
                <i className="fas fa-pencil-alt"></i>
                Editar
            </button>
            <button onClick={() => deletarRelacionamento(item._id)} className="btn btn-transparent btn-transparent-primary">
              <i className="fas fa-times"></i>
            </button>
          </div>
          </>
          }
          
        </li>  
      )} 
    </>
  )
}
//RENDERIZAR ALERTA
  const renderAlerta = () => {
    if (values.mostrarAlerta) {
      return <Alert type={values.typeAlerta} position={values.positionAlert} text={values.textAlert} />
    }
  }

  return (
    <>
      {renderAlerta()}
      <div className="dashboardBeneficiaryMeuCadastroRelacionamento">
        <ul className="dashboardBeneficiaryMeuCadastroRelacionamento-ul">

          {renderRowAdicionaRelacionamento()}

          {renderRowsDosRelacionamentos()}
          
        </ul>
      </div>
    </>
  );
}