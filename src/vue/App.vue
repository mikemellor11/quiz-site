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
                // If a session id stored in state then try to rejoin
                if(this.session){
                    this.socket.emit('join', this.session);
                }
            });
        },
        beforeDestroy(){
            // Remove all listeners on hotreload so duplicate events aren't fired
            this.socket.removeAllListeners();
        }
    };
</script>