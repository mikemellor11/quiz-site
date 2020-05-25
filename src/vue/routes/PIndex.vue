<template>
    <div class="h-full grid grid-rows-4 grid-cols-4 h-100 gap-4">
        <VVisualize
            class="
                col-span-3
                row-span-2
            "
        />

        <VScore
            class="
                col-span-1
                row-span-3
            "
        />

        <VQuestion
            class="
                col-span-3
                row-span-2
            "
        />

        <VChat
            class="
                col-span-1
                row-span-1
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