<template>
    <router-view
        :socket="socket"
        :room="room"
    />
</template>

<script>
    import io from 'socket.io-client';

    export default {
        data: function () {
            return {
                socket: io(`http://192.168.0.11:8080${window.location.pathname}`),
                room: window.location.pathname
            };
        },

        mounted(){
            if(!this.$store.state.name){
                this.$store.commit('setName', window.prompt('Please tell me your name'));
            }

            this.socket.emit('username', this.$store.state.name);
        }
    };
</script>