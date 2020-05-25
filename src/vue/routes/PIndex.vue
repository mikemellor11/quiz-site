<template>
    <div class="h-full grid grid-rows-6 grid-cols-12 h-100 gap-4">
        <VVisualize
            class="
                col-span-8
                row-span-4
            "
        />

        <VScore
            class="
                col-span-4
                row-span-4
            "
        />

        <VQuestion
            class="
                col-span-8
                row-span-2
            "
        />

        <VChat
            class="
                col-span-4
                row-span-2
            "
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'PIndex',

        data: function () {
            return {
            };
        },

        computed: mapState([
        ]),

        components: {
            'VChat': require('../components/VChat.vue').default,
            'VScore': require('../components/VScore.vue').default,
            'VVisualize': require('../components/VVisualize.vue').default,
            'VQuestion': require('../components/VQuestion.vue').default
        }
    };
</script>