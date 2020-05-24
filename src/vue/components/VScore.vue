<template>
    <div>
        <h3>Scores:</h3>
        <ol>
            <li
                v-for="(score, i) in scores"
                :key="i"
                v-text="`${score.name}: ${score.score}`"
            />
        </ol>
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