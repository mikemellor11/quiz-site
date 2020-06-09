<template>
    <div class="visualize flex items-center justify-center">
        <button
            v-if="session && state === 1"
            class="
                button
                object-center
            "
            v-text="'Start'"
            v-on:click="start"
        />
        <p
            v-else
            v-text="'Imagine horses here'"
        />
    </div>
</template>

<script>
    import Vue from "vue";
    import { mapState } from "vuex";

    export default {
        name: 'VVisualize',

        data: function () {
            return {
            };
        },

        computed: {
            ...mapState(Vue.prototype.room, {
                "session": state => state.session,
                "state": state => state.state
            })
        },

        methods: {
            start(){
                this.socket.emit('start');       
            }
        },

        mounted(){
        }
    };
</script>