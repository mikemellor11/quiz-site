import Vue from 'vue';
import store from './store.js';
import router from './router.js';
import socket from "./socket.js";

Vue.prototype.socket = socket;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(require('../vue/App.vue').default)
});