<template>
    <div class="h-full grid grid-rows-6 grid-cols-12 gap-4">
        <VVisualize
            class="
                lg:col-span-8
                lg:row-span-4
                lg:flex
                hidden
            "
        />

        <VScore
            class="
                lg:col-span-4
                lg:row-span-4
                col-span-12
                row-span-2
            "
        />

        <VQuestion
            class="
                lg:col-span-8
                lg:row-span-2
                col-span-12
                row-span-2
                lg:order-none
                order-first
            "
        />

        <VChat
            class="
                lg:col-span-4
                lg:row-span-2
                col-span-12
                row-span-2
            "
        />
    </div>
</template>

<script>
    import Vue from "vue";
    import axios from "axios";
    import * as socket from "../../js/socket.js";

    export default {
        name: 'PIndex',

        computed: {
            session(){
                return this.$store.state[Vue.prototype.room].session;
            },
            state(){
                return this.$store.state[Vue.prototype.room].state;
            }
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

        beforeCreate(){
            Vue.prototype.room = window.location.pathname;

            socket.init();

            var persisted = window.localStorage.getItem(document.title);
            var storage = persisted && JSON.parse(persisted)[Vue.prototype.room] || false;

            if(!this.$store.hasModule(Vue.prototype.room)){
                this.$store.registerModule(Vue.prototype.room, require('../../js/store/session').default, { preserveState: storage });
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
        },

        components: {
            'VChat': require('../components/VChat.vue').default,
            'VScore': require('../components/VScore.vue').default,
            'VVisualize': require('../components/VVisualize.vue').default,
            'VQuestion': require('../components/VQuestion.vue').default
        }
    };
</script>