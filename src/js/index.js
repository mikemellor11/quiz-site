import Vue from 'vue';
import store from './store.js';
import router from './router.js';

window.endpoint = 'http://192.168.0.11:8080';
// window.endpoint = 'https://mikemellor11-quiz-api.herokuapp.com';

console.log(process.env.NODE_ENV);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(require('../vue/App.vue').default)
});