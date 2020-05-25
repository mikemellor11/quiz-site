<template>
    <main class="p-4">
        <router-view/>
    </main>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState([
            'session'
        ]),

        mounted(){
            this.socket.on('connect', () => {
                if(this.session){
                    this.socket.emit('join', this.session);
                }
            });
        },
        beforeDestroy(){
            this.socket.removeAllListeners();
        }
    };
</script>