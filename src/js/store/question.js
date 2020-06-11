import Vue from "vue";
import axios from "axios";

const CancelToken = axios.CancelToken;

export default {
    namespaced: true,
    
    state: () => ({
        array: null
    }),

    mutations: {
        update(state, payload){
            state.array = payload;
        }
    },

    actions: {
        update(context){
            if(this.cancel){
                this.cancel();
                this.cancel = null;
            }
            
            return axios.get(
                    `http://192.168.0.11:8080/question${Vue.prototype.room}`, 
                    {
                        cancelToken: new CancelToken(c => this.cancel = c)
                    }
                )
                .then(res => context.commit('update', res.data))
                .catch(err => console.log(err.message))
                .finally(() => this.cancel = null);
        }
    }
};