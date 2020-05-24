<template>
    <main class="p-4">
        <router-view/>
    </main>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState([
            'name',
            'socket',
            'room'
        ]),

        mounted(){
            if(!this.name){
                this.$store.commit('setName', window.prompt('Please tell me your name'));
            }

            this.socket.on('connect', () => this.socket.emit('username', this.name));
        },
        beforeDestroy(){
            this.socket.disconnect();
        }
    };
</script>