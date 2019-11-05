import api from './../../../../../../../Services/api';
import axios from 'axios';

let DebugConsole = true;

const RelantionshipsController = {
    async FirstQueryForAPI(callback){
        try{
            if(DebugConsole)console.log("Recebeu");
            const obj = {
                limit :"25",
                page: "1",
                sort: {
                  by:"valor",
                  order:"asc"
                }
            };
            //api.post(`relationships`, obj)
            axios({
              baseURL: 'https://social-me-v2.herokuapp.com/ergCNTis',
              headers: {'mundo-data-token': localStorage.getItem('token')},
              method: 'post',
              url: 'relationships',
              data: {
                limit :"25",
                page: "1",
                sort: {
                  by:"valor",
                  order:"asc"
                }
              }
            })
            .then(res => {
                if(DebugConsole)console.log("Chegou");
                callback(res.data);
            })
            .catch(function (error) {
                if(DebugConsole)console.log(error);
            })
        }catch (error){
        }
    },
    async teste2(){
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
		return beneficiaryMeuCadastroItensDoMenu
	}
}
 
export default RelantionshipsController;