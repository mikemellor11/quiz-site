import Vue from 'vue';
import router from './router.js';
import store from './store.js';
import socket from "./socket.js";
import axios from "axios";

Vue.prototype.socket = socket;
Vue.prototype.room = window.location.pathname;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(require('../vue/App.vue').default)
});

store.commit('updateState', null);
axios.get(`http://192.168.0.11:8080/state${Vue.prototype.room}`)
    .then(res => {
        if(!store.state.state){
            store.commit('updateState', res.data);
        }
    });

socket.on('update state', (state) => store.commit('updateState', state));