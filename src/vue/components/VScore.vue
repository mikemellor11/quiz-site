<template>
    <div>
        <h3>Scores:</h3>
        <ol>
            <li
                v-for="(player, i) in players"
                :key="i"
                v-text="`${player.name}: ${player.score}`"
            />
        </ol>
        <p
            v-text="`${spectators.length} people spectating:`"
        />
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'VScore',

        data: function () {
            return {
                scores: [],
            };
        },

        computed: {
            spectators(){
                return this.scores.filter(d => !d.name);
            },
            players(){
                return this.scores.filter(d => d.name);
            }
        },

        methods: {
            update(){
                axios.get(`http://192.168.0.11:8080/scores${this.room}`)
                    .then(res => {
                        this.scores = res.data;
                    });
            }
        },

        mounted(){
            this.update();

            this.socket.on('update users', () => this.update());
        }
    };
</script>