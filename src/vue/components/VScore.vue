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
            <div
                v-if="state === 1"
            >
                <button
                    v-if="!session"
                    class="
                        w-full
                        button
                    "
                    v-text="'Join'"
                    v-on:click="join"
                />
                <button
                    v-else
                    class="
                        w-full
                        button
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

    const CancelToken = axios.CancelToken;

    export default {
        name: 'VScore',

        data: function () {
            return {
                scores: [],
                cancel: null
            };
        },

        computed: {
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
                if(this.cancel){
                    this.cancel();
                    this.cancel = null;
                }

                axios.get(
                        `http://192.168.0.11:8080/scores${this.room}`, 
                        {
                            cancelToken: new CancelToken(c => this.cancel = c)
                        }
                    )
                    .then(res => {
                        this.cancel = null;
                        
                        this.scores = res.data;

                        // If the user has multiple tabs when first joining then send join command for each socket that isn't yet added to sockets array
                        if(this.socket.id){
                            var user = this.session && this.players.find(d => d.id === this.session.id);
                            if(user && user.sockets.indexOf(this.socket.id) === -1){
                                this.socket.emit('join', this.session);
                            }
                        }
                    })
                    .catch(function (err) {
                        if(axios.isCancel(err)) {
                            console.log('Request canceled: ', err.message);
                        } else {
                            // handle error
                        }
                    });
            },
            join(e){
                e.target.blur();

                this.$store.commit(`${Vue.prototype.room}/newSession`, {
                    id: uuidv4(),
                    name: window.prompt('Please tell me your name') || 'Unnamed'
                });

                this.socket.emit('join', this.session);
            },
            leave(e){
                e.target.blur();

                this.socket.emit('leave', this.session);

                this.$store.commit(`${Vue.prototype.room}/endSession`);
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