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
            <div>
                <button
                    v-if="!$store.state.session"
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
            ...mapState([
                'session'
            ])
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

                this.$store.commit('newSession', {
                    id: uuidv4(),
                    name: window.prompt('Please tell me your name')
                });

                this.socket.emit('join', this.session);
            },
            leave(e){
                e.target.blur();

                this.$store.commit('endSession');

                this.socket.emit('leave');
            }
        },

        mounted(){
            this.update();

            this.socket.on('update users', () => this.update());
        }
    };
</script>