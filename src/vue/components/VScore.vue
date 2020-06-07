<template>
    <div class="flex flex-col">
        <div class="score flex-auto flex flex-col">
            <h3>Scores:</h3>
            <ol class="flex-auto">
                <li
                    v-for="(player, i) in players"
                    :key="i"
                    v-text="`${player.session.name}: ${player.score}`"
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
    import { mapState } from 'vuex';

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
            },
            ...mapState(Vue.prototype.room, {
                "session": state => state.session,
                "state": state => state.state
            })
        },

        methods: {
            update(){
                axios.get(`http://192.168.0.11:8080/scores${this.room}`)
                    .then(res => {
                        this.scores = res.data;
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
        }
    };
</script>