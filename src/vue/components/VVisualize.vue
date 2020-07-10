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
        <ul
            class="
                course
            "
            v-else-if="state === 2"
        >
            <li
                v-for="(player, i) in players"
                :key="i"
            >
                <VHorse
                    :style="{
                        'left': `${100 - ((player.score / 1000) * 100)}%`
                    }"
                    :color="colors[i]"
                />
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from "vue";
     
    export default {
        name: 'VVisualize',

        data(){
            return {
                colors: [
                    'orange',
                    'green',
                    'purple',
                    'red',
                    'white',
                    'blue'
                ]
            }
        },

        computed: {
            scores(){
                return this.$store.state[Vue.prototype.room].scores.array;
            },
            players(){
                return this.scores.filter(d => d.id);
            },
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

        components: {
            'VHorse': require('./VHorse.vue').default
        }
    };
</script>