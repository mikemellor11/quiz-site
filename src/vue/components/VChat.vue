<template>
    <div class="chat flex flex-col">        
        <ul class="chat__messages flex-auto">
            <li
                v-for="(message, i) in messages"
                :key="i"
                v-html="message"
            />
        </ul>

        <form
            class="
                form
                flex
                mt-4
            "
            v-on:submit.prevent="send"
        >
            <input
                v-model="message"
                autocomplete="off"
                type="text"
                placeholder="Message..."
                class="
                    flex-auto
                    form__input
                "
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
</template>

<script>
    export default {
        name: 'VChat',

        data: function () {
            return {
                messages: [],
                message: ''
            };
        },

        methods: {
            send(){
                this.socket.emit('input', this.message);
                this.message = '';
            }
        },

        mounted(){
            this.socket.on('output', msg => this.messages.unshift(msg));
        }
    };
</script>