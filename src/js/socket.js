import Vue from "vue";
import io from 'socket.io-client';

export function init(){
    Vue.prototype.socket = io(`http://192.168.0.11:8080${Vue.prototype.room}`);
};