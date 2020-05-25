<template>
    <div class="visualize">
        <button
            class="
                button
                object-center
            "
            v-text="'Start'"
            v-on:click="start"
        />
    </div>
</template>

<script>
    export default {
        name: 'VVisualize',

        data: function () {
            return {
            };
        },

        methods: {
            start(){
                console.log("ASDF");
            }
        },

        mounted(){
        }
    };
</script>