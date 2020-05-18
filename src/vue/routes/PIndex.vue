<template>
    <div>        
        <h1>Quiz</h1>
        <h2>Room: {{room}}</h2>

        <h3>Scores:</h3>
        <ol>
            <li
                v-for="(score, i) in scores"
                :key="i"
                v-text="`${score.name}: ${score.score}`"
            />
        </ol>

        <div
            v-if="question"
        >
            <p
                v-html="question.question"
            />
            <ul>
                <li
                    v-for="(answer, i) in question.answers"
                    :key="i"
                    v-html="answer"
                />
            </ul>
        </div>

        <button
            v-text="'Start'"
            v-on:click="start"
        />

        <VChat
            :socket="socket"
            :room="room"
        />
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'PIndex',

        data: function () {
            return {
                scores: [],
                question: null
            };
        },

        props: [
            'socket',
            'room'
        ],

        methods: {
            start(){
                this.socket.emit('start', this.room);
            }
        },

        mounted(){
            this.socket.on('question', json => this.question = json);
            this.socket.on('update users', () => {
                axios.get(`http://192.168.0.11:8080/scores${this.room}`)
                    .then(res => {
                        this.scores = res.data;
                    });
            });
        },

        components: {
            'VChat': require('../components/VChat.vue').default
        }
    };
</script>