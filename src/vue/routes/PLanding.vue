<template>
    <div class="h-full flex justify-center items-center">
        <div class="
            w-full
            max-w-xl
        ">
            <h1>Donkey Derby</h1>

            <form
                class="
                    form
                    flex
                    mt-4
                "
                v-on:submit.prevent="send"
            >
                <input
                    v-model="room"
                    autocomplete="off"
                    type="text"
                    placeholder="Game room..."
                    class="
                        flex-auto
                        form__input
                    "
                    required
                />
                <button
                    class="
                        button
                        ml-4
                    "
                    type="submit"
                    v-text="'Send'"
                />
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PLanding',

        data: function () {
            return {
                room: ''
            };
        },

        methods: {
            send(){
                this.$router.push(this.room);
            }
        }
    };
</script>