// Parcel dev hotreload toggle
if(module.hot) { module.hot.accept(); }

require('socket.io-client');

import Vue from 'vue';
import App from '../vue/app/App.vue';

new Vue({
    el: '#app',
    render: h => h(App),
});