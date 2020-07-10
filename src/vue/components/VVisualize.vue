<template>
    <div class="visualize flex items-center justify-center" ref="container">
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
                        'left': `${100 - ((player.score / 1000) * 100)}%`,
                        'width': `${height}px`
                    }"
                    :color="player.color"
                    :name="player.name"
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
                windowHeight: 0
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
            },
            height(){
                return (this.windowHeight * 0.75) / this.players.length;
            }
        },

        methods: {
            start(){
                this.socket.emit('start');       
            },
            calcHeight(){
                this.windowHeight = this.$refs.container.clientHeight;
            }
        },

        mounted(){
            this.calcHeight();
            window.addEventListener('resize', this.calcHeight);
        },

        beforeDestroy(){
            window.removeEventListener('resize', this.calcHeight);
        },

        components: {
            'VHorse': require('./VHorse.vue').default
        }
    };
</script>