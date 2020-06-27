import Vue from "vue";
import Vuex from "vuex";
import VuexPersistedState from "vuex-persistedstate";
import createMultiTabState from 'vuex-multi-tab-state';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createMultiTabState(),
        VuexPersistedState({
            key: document.title
        })
    ]
});