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
    import axios from "axios";
    import { mapState } from 'vuex';

    const CancelToken = axios.CancelToken;

    export default {
        name: 'VQuestion',

        data: function () {
            return {
                question: null
            };
        },

        computed: {
            submitted(){
                return this.question.submitted.find(d => d.id === this.session.id) || {};
            },
            ...mapState(Vue.prototype.room, {
                "session": state => state.session,
                "state": state => state.state
            })
        },

        methods: {
            update(){
                if(this.cancel){
                    this.cancel();
                    this.cancel = null;
                }

                axios.get(
                        `http://192.168.0.11:8080/question${this.room}`, 
                        {
                            cancelToken: new CancelToken(c => this.cancel = c)
                        }
                    )
                    .then(res => {
                        this.cancel = null;

                        return this.question = res.data;
                    })
                    .catch(function (err) {
                        if(axios.isCancel(err)) {
                            console.log('Request canceled: ', err.message);
                        } else {
                            // handle error
                        }
                    });
            }
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