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
                            v-html="answer"
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
            ...mapState([
                'state'
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