<template>
    <div class="question">
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
    </div>
</template>

<script>
    export default {
        name: 'VQuestion',

        data: function () {
            return {
                question: null
            };
        },

        methods: {
        },

        mounted(){
        }
    };
</script>