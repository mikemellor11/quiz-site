<template>
    <div class="flex flex-col">
        <div class="score flex-auto">
            <h3>Scores:</h3>
            <ol>
                <li
                    v-for="(player, i) in players"
                    :key="i"
                    v-text="`${player.session.name}: ${player.score}`"
                />
            </ol>
        </div>
        <div>
            <p
                class="
                    mt-3
                    text-right
                "
                v-text="`${players.length} playing`"
            />
            <p
                class="
                    mt-3
                    text-right
                "
                v-text="`${spectators.length} spectating`"
            />
        </div>
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
                return this.scores.filter(d => !d.session);
            },
            players(){
                return this.scores.filter(d => d.session);
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