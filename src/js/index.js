import Vue from 'vue';
import router from './router.js';
import store from './store.js';
import socket from "./socket.js";

Vue.prototype.socket = socket;
Vue.prototype.room = window.location.pathname;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(require('../vue/App.vue').default)
});