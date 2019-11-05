import React, { useState, useEffect } from "react";
import './Relantionships.css';
import RelantionshipsController from './RelantionshipsController';
import api from './../../../../../../../Services/api';
import ImageUser from './../../../../../../../Assets/Images/user.png';
import ImageAdd from './../../../../../../../Assets/Images/add.png';
import ImageCircle from './../../../../../../../Assets/Images/circle.png';
import Alert from './../../../../../../../Components/Alert';
import axios from 'axios';

const DashboardBeneficiaryMyRegisterRelantionships = () => {
    const [values, setValues] = useState({
        userId: '5d9ca0e96ca01a3818444728',
        todosOsRelacionamentos: [],
        idDaRowEmEdicao: '',
        tipoDoRelacionamentoDaEdicao: '',
        mostrarFormAddRelacionamento: false,
        cpfDoNovoRelacionamento: '', /* 02713530237 */
        nomedaPessoaDoNovoRelacionamento: '',
        idDaPessoaDoNovoRelacionamento: '',
        fotoDaPessoaDoNovoRelacionamento: '',
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
          const obj = {
            cpf: values.cpfDoNovoRelacionamento
          }
          //api.post(`person/searchByDocument`,obj)
          axios({
            baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
            headers: {'mundo-data-token': localStorage.getItem('token')},
            method: 'post',
            url: 'person/searchByDocument',
            data: {
              cpf: values.cpfDoNovoRelacionamento
            }
          })
          .then(res => {
            console.log(res);
            setValues({ 
              ...values, 
              nomedaPessoaDoNovoRelacionamento: res.data.data.person.profile.name,
              idDaPessoaDoNovoRelacionamento: res.data.data.person._id,
              fotoDaPessoaDoNovoRelacionamento: res.data.data.person.profile.photo
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
        RelantionshipsController.FirstQueryForAPI((result) => {
            setValues({ 
                ...values, 
                todosOsRelacionamentos: result.data.RelationshipsList,
                mostrarFormAddRelacionamento: false
            });
        });
      }
    }, [values.auxPegarDados]);
    const teste3 = () => {
        console.log('TESTE3')
    }
    //CHAMA A PRIMEIRA VEZ
    useEffect(() => {
      const fetchData = async () => {
        RelantionshipsController.FirstQueryForAPI((result) => {
            setValues({ 
                ...values, 
                todosOsRelacionamentos: result.data.RelationshipsList,
                mostrarFormAddRelacionamento: false
            });
        });
      };
      fetchData();
    }, []);
    //ADICIONANDO RELACIONAMENTO
      const addRelacionamento = () => {
        setValues({ ...values, auxPegarDados: false });
        console.log('ADICIONANDO');
        const obj = {
          personId: values.idDaPessoaDoNovoRelacionamento,
          link: values.tipoDoNovoRelacionamento
        }
        //api.post(`relationship/new`,obj)
        axios({
          baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
          headers: {'mundo-data-token': localStorage.getItem('token')},
          method: 'post',
          url: 'relationship/new',
          data: {
            personId: values.idDaPessoaDoNovoRelacionamento,
            link: values.tipoDoNovoRelacionamento
          }
        })
        .then(res => {
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
      const deletarRelacionamento = (idDaPessoa) => {
        console.log('DELETANDO');
        setValues({ ...values, auxPegarDados: false });
        // REMOVEU COM SUCESS : "F1DE4ABACCFE158"
        //api.delete(`relationship/${idDaPessoa}`)
        axios({
          baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
          headers: {'mundo-data-token': localStorage.getItem('token')},
          method: 'delete',
          url: `relationship/${idDaPessoa}`
        })
        .then(res => {
          console.log(res.data);
          if(res.data.header.code === 'F1DE4ABACCFE158'){
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
        //api.put(`atualizarRelacionamento/${values.userId}/${values.idDaRowEmEdicao}`,obj)
        axios({
          baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
          headers: {'mundo-data-token': localStorage.getItem('token')},
          method: 'put',
          url: `atualizarRelacionamento/${values.userId}/${values.idDaRowEmEdicao}`,
          data: {
            vinculo: values.tipoDoRelacionamentoDaEdicao
          }
        })
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
                    {values.fotoDaPessoaDoNovoRelacionamento ?
                      <img src={values.fotoDaPessoaDoNovoRelacionamento} alt="Imagem padrão de usuário" />
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
                      <option value="MAE">Mãe</option>
                      <option value="FILHO">Filho</option>
                      <option value="FILHA">Filha</option>
                      <option value="AMIGO">Amigo</option>
                      <option value="AMIGA">Amiga</option>
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
                <img src={item.linkedPerson.profile.photo ? item.linkedPerson.profile.photo : ImageUser} alt="Imagem padrão de usuário" />
              </div>
              <div className="form-group">
                <p>{item.linkedPerson.profile.name}</p>
              </div>
              <div className="form-group">
                <select 
                  className="form-control"
                  value={values.tipoDoRelacionamentoDaEdicao}
                  onChange={handleChange('tipoDoRelacionamentoDaEdicao')}
                >
                  <option value="">Selecione um relacionamento</option>
                  <option value="PAI">Pai</option>
                  <option value="MAE">Mãe</option>
                  <option value="FILHO">Filho</option>
                  <option value="FILHA">Filha</option>
                  <option value="AMIGO">Amigo</option>
                  <option value="AMIGA">Amiga</option>
                </select>
              </div>
              <button onClick={() => atualizarRelacionamento(item._id)} className="btn btn-primary">Salvar Alterações</button>
              <button onClick={() => cancelandoAtualizacao()} className="btn btn-primary">Cancelar</button>
              </div>
              </>
              :
                <>
              <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-imgContainer">
                <img src={item.linkedPerson.profile.photo ? item.linkedPerson.profile.photo : ImageUser} alt="Imagem padrão de usuário" />
              </div>
              <div className="dashboardBeneficiaryMeuCadastroRelacionamento-li-containerInfo">
                <p>{item.linkedPerson.profile.name} <span>(pendente)</span></p>
                <span>{item.link}</span>
              </div>
              <div className="dashboardBeneficiaryMeuCadastroRelacionamento-buttonsActions">
                <button onClick={() => toggleRowEditarRelacionamento(item._id, item.link)} className="btn btn-transparent btn-transparent-primary">
                    <i className="fas fa-pencil-alt"></i>
                    Editar
                </button>
                <button onClick={() => deletarRelacionamento(item.linkedPerson._id)} className="btn btn-transparent btn-transparent-primary">
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
 
export default DashboardBeneficiaryMyRegisterRelantionships;