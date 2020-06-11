<template>
    <div
        class="
            question
            flex
        "
    >
        <div
            v-if="question && state === 2"
            class="
                text-center
                flex-auto
                flex
                flex-col
            "
        >
            <p
                v-html="question.question"
                class="
                    py-4
                "
            />
            <div
                class="
                    pt-4
                    flex-auto
                    flex
                "
            >
                <ul
                    class="
                        grid
                        grid-cols-2
                        gap-4
                        flex
                        flex-auto
                    "
                >
                    <li
                        v-for="(answer, i) in question.answers"
                        :key="i"
                        class="flex"
                    >
                        <button
                            class="
                                button
                                w-full
                            "
                            :class="{
                                'active': submitted.index === i,
                                'correct': question.answer === i,
                                'incorrect': question.answer != null && submitted.index === i && submitted.index !== question.answer
                            }"
                            v-html="answer"
                            v-on:click="socket.emit('answer', {session: session, index: i})"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'VQuestion',

        computed: {
            submitted(){
                return this.question.submitted.find(d => d.id === this.session.id) || {};
            },
            ...mapState(Vue.prototype.room, {
                "session": state => state.session,
                "state": state => state.state
            }),
            ...mapState('question', {
                "question": state => state.array
            })
        },

        methods: {
            ...mapActions('question', [
                'update'
            ]),
        },

        mounted(){
            this.update();
                 
            this.socket.on('question', () => this.update());
        },

        beforeDestroy(){
            this.socket.off('question');
        }
    };
</script>