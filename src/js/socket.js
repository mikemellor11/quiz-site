import Vue from "vue";
import io from 'socket.io-client';

export function init(){
    Vue.prototype.socket = io(`${window.endpoint}${Vue.prototype.room}`);
};