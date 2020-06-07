import Vue from "vue";
import Vuex from "vuex";
import VuexPersistedState from "vuex-persistedstate";

Vue.prototype.room = window.location.pathname;

Vue.use(Vuex);

var store = new Vuex.Store();

store.registerModule(Vue.prototype.room, require('./store/session').default);

// Load persisted state after module registration
VuexPersistedState({
    key: document.title
})(store);

export default store;