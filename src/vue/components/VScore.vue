<template>
    <div class="flex flex-col">
        <div class="score flex-auto flex flex-col">
            <h3>Scores:</h3>
            <ol class="flex-auto">
                <li
                    v-for="(player, i) in players"
                    :key="i"
                    v-text="`${player.name}: ${player.score}`"
                    :class="questionStatus(player, i)"
                />
            </ol>
            <div>
                <button
                    v-if="state === 3"
                    class="
                        w-full
                        button
                        mt-4
                    "
                    v-text="'Reset'"
                    v-on:click="socket.emit('reset')"
                />
                <button
                    v-if="session && state === 1"
                    class="
                        w-full
                        button
                        mt-4
                    "
                    v-text="'Start'"
                    v-on:click="start"
                />
                <button
                    v-if="!session && state === 1"
                    class="
                        w-full
                        button
                        mt-4
                    "
                    v-text="'Join'"
                    v-on:click="join"
                />
                <button
                    v-if="session"
                    class="
                        w-full
                        button
                        mt-4
                        button--1
                    "
                    v-text="'Leave'"
                    v-on:click="leave"
                />
            </div>
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
    import Vue from "vue";
    import axios from "axios";
    import { v4 as uuidv4 } from 'uuid';

    export default {
        name: 'VScore',

        computed: {
            scores(){
                return this.$store.state[Vue.prototype.room].scores.array;
            },
            spectators(){
                return this.scores.filter(d => !d.id);
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
            question(){
                return this.$store.state[Vue.prototype.room].question.array;
            }
        },

        watch: {
            session(){
                // If session set and currently still a spectator call join
                if(this.session && this.spectators.includes(this.socket.id)){
                    this.socket.emit('join', this.session);
                }
            }
        },

        methods: {
            questionStatus(player){
                var status = this.question && this.question.submitted.length && this.question.submitted.find(d => d.id === player.id);

                return {
                    'text-gray-700': !player.sockets.length,
                    'text-purple-300': status && this.question.answer == null,
                    'text-red-500': status && status.index !== this.question.answer,
                    'text-green-500': status && status.index === this.question.answer
                };
            },
            update(){
                this.$store.dispatch(`${Vue.prototype.room}/scores/update`);
            },
            join(e){
                e.target.blur();

                this.$store.commit(`${Vue.prototype.room}/newSession`, {
                    id: uuidv4(),
                    name: window.prompt('Please tell me your name') || 'Unnamed',
                    color: window.prompt('Color (hex or color name)') || 'white'
                });
            },
            leave(e){
                e.target.blur();

                this.socket.emit('leave', this.session);

                this.$store.commit(`${Vue.prototype.room}/endSession`);
            },
            start(){
                this.socket.emit('start');
            }
        },

        mounted(){
            this.update();

            this.socket.on('update users', () => this.update());
        },

        beforeDestroy(){
            this.socket.off('update users');
        }
    };
</script>