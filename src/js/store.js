import Vue from "vue";
import Vuex from "vuex";
import VuexPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        VuexPersistedState({
    		key: document.title
    	})
    ],
    
    state: {
        session: null
    },

    mutations: {
        newSession(state, payload){
            state.session = payload;
        },
        endSession(state, payload){
            state.session = null;
        }
    }
});