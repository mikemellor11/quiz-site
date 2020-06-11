import Vue from "vue";
import Vuex from "vuex";
import VuexPersistedState from "vuex-persistedstate";
import createMultiTabState from 'vuex-multi-tab-state';

Vue.prototype.room = window.location.pathname;

Vue.use(Vuex);

var store = new Vuex.Store({
    plugins: [
        createMultiTabState(),
    ],

    modules: {
        'question': require('./store/question').default
    }
});

store.registerModule(Vue.prototype.room, require('./store/session').default);

// Load persisted state after module registration
VuexPersistedState({
    key: document.title
})(store);

export default store;