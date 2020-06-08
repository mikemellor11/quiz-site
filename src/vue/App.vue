<template>
    <main class="p-4">
        <router-view/>
    </main>
</template>

<script>
    import Vue from "vue";
    import { mapState } from 'vuex';
    import axios from "axios";

    export default {
        computed: {
            ...mapState(Vue.prototype.room, {
                "session": state => state.session,
                "state": state => state.state
            })
        },

        methods: {
            update(){
                this.$store.commit(`${Vue.prototype.room}/updateState`, null);

                axios.get(`http://192.168.0.11:8080/state${Vue.prototype.room}`)
                    .then(res => {
                        // Check here if state has been set during the time the request has been running, socket should take priority
                        if(!this.state){
                            this.$store.commit(`${Vue.prototype.room}/updateState`, res.data);
                        }
                    });
            }
        },

        mounted(){
            this.update();

            this.socket.on('connect', () => {
                if(this.session){
                    this.socket.emit('join', this.session);
                }
            });

            this.socket.on('disconnect', () => {
                this.$store.commit(`${Vue.prototype.room}/updateState`, null);
            });

            this.socket.on('reconnect', () => {
                this.update();
            });

            this.socket.on('update state', (state) => {
                this.$store.commit(`${Vue.prototype.room}/updateState`, state);
            });
        },
        beforeDestroy(){
            this.socket.off('connect');
            this.socket.off('disconnect');
            this.socket.off('reconnect');
            this.socket.off('update state');
        }
    };
</script>