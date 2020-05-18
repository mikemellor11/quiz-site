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

        <ul>
            <li
                v-for="(message, i) in messages"
                :key="i"
                v-html="message"
            />
        </ul>

        <div>
            <input
                v-model="message"
                autocomplete="off"
                placeholder="type your message here..."
            />
            <button
                v-on:click="send"
                v-text="'Send'"
            />
        </div>

        <button
            v-text="'Start'"
            v-on:click="start"
        />
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import axios from "axios";

    export default {
        name: 'PIndex',

        data: function () {
            return {
                socket: null,
                room: window.location.pathname,
                messages: [],
                message: '',
                scores: [],
                question: null
            };
        },

        methods: {
            send(){
                this.socket.emit('input', this.message);
                this.message = '';
            },
            start(){
                this.socket.emit('start', this.room);
            }
        },

        mounted(){
            this.socket = io(`http://192.168.0.11:8080/${this.room}`);
            this.socket.on('output', msg => this.messages.push(msg));
            this.socket.on('question', json => this.question = json);

            if(!this.$store.state.name){
                this.$store.commit('setName', window.prompt('Please tell me your name'));
            }

            this.socket.emit('username', this.$store.state.name);

            axios.get('http://192.168.0.11:8080/scores')
                .then(res => {
                    this.scores = res.data;
                });
        }
    };
</script>