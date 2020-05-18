import Vue from 'vue';
import router from './router.js';
import store from './store.js';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(require('../vue/App.vue').default),
});