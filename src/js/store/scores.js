import Vue from "vue";
import axios from "axios";

const CancelToken = axios.CancelToken;
var cancel;

export default {
    namespaced: true,
    
    state: () => ({
        array: []
    }),

    mutations: {
        update(state, payload){
            state.array = payload;
        }
    },

    actions: {
        update(context){
            if(cancel){
                cancel();
                cancel = null;
            }
            
            return axios.get(
                    `${window.endpoint}/scores${Vue.prototype.room}`, 
                    {
                        cancelToken: new CancelToken(c => cancel = c)
                    }
                )
                .then(res => {
                    context.commit('update', res.data);
                    // If the user has multiple tabs when first joining then send join command for each socket that isn't yet added to sockets array
                    // if(this.socket.id){
                    //     var user = this.session && this.players.find(d => d.id === this.session.id);
                    //     if(user && user.sockets.indexOf(this.socket.id) === -1){
                    //         this.socket.emit('join', this.session);
                    //     }
                    // }
                })
                .catch(err => {
                    if(axios.isCancel(err)) {
                        console.log('Scores request canceled: ', err.message);
                    } else {
                        // handle error
                    }
                })
                .finally(() => cancel = null);
        }
    }
};