<template>
    <div class="h-full grid grid-rows-4 grid-cols-4 h-100 gap-4">
        <div class="col-span-3 row-span-2">
            <h1>Quiz</h1>
            <h2>Room: {{room}}</h2>
        </div>

        <VScore
            class="col-span-1 row-span-3"
        />

        <div class="col-span-3 row-span-2">
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
                class="
                    button
                "
                v-text="'Join'"
                v-on:click="join"
            />
        </div>

        <VChat
            class="col-span-1 row-span-1"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'PIndex',

        data: function () {
            return {
                question: null
            };
        },

        computed: mapState([
            'name'
        ]),

        methods: {
            join(e){
                e.target.blur();

                this.$store.commit('setName', window.prompt('Please tell me your name'));
                this.socket.emit('username', this.name);

                //this.socket.emit('start', this.room);
            }
        },

        mounted(){
            // this.socket.on('question', json => this.question = json);
        },

        components: {
            'VChat': require('../components/VChat.vue').default,
            'VScore': require('../components/VScore.vue').default
        }
    };
</script>