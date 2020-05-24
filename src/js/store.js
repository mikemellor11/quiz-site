import Vue from "vue";
import Vuex from "vuex";
import VuexPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import io from 'socket.io-client';

export default new Vuex.Store({
    plugins: [
        VuexPersistedState({
    		key: document.title
    	})
    ],
    
    state: {
        name: '',
        socket: io(`http://192.168.0.11:8080${window.location.pathname}`),
        room: window.location.pathname
    },

    mutations: {
        setName(state, payload){
            state.name = payload;
        }
    }
});