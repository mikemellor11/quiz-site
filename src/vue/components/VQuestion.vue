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
                                'active': submitted.index === i
                            }"
                            v-html="answer"
                            v-on:click="socket.emit('answer', i)"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapState } from 'vuex';

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
            ...mapState([
                'state',
                'session'
            ])
        },

        methods: {
            update(){
                axios.get(`http://192.168.0.11:8080/question${this.room}`)
                    .then(res => this.question = res.data);
            }
        },

        mounted(){
            this.update();
                 
            this.socket.on('question', () => this.update());
        }
    };
</script>