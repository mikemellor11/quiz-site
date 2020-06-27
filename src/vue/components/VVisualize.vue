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

    export default {
        name: 'VVisualize',

        data: function () {
            return {
            };
        },

        computed: {
            session(){
                return this.$store.state[Vue.prototype.room].session;
            },
            state(){
                return this.$store.state[Vue.prototype.room].state;
            }
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