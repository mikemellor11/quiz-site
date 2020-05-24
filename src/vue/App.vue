<template>
    <main class="p-4">
        <router-view/>
    </main>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState([
            'name'
        ]),

        mounted(){
            this.socket.on('connect', () => {
                if(this.name){
                    this.socket.emit('username', this.name);
                }
            });
        },
        beforeDestroy(){
            this.socket.removeAllListeners();
        }
    };
</script>