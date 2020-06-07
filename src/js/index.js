import Vue from 'vue';
import store from './store.js';
import router from './router.js';
import socket from "./socket.js";
import axios from "axios";

Vue.prototype.socket = socket;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(require('../vue/App.vue').default)
});

store.commit(`${Vue.prototype.room}/updateState`, null);
axios.get(`http://192.168.0.11:8080/state${Vue.prototype.room}`)
    .then(res => {
        // Check here if state has been set during the time the request has been running, socket should take priority
        if(!store.state[Vue.prototype.room].state){
            store.commit(`${Vue.prototype.room}/updateState`, res.data);
        }
    });

socket.on('update state', (state) => store.commit(`${Vue.prototype.room}/updateState`, state));