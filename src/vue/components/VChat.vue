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
    import Vue from "vue";

    export default {
        name: 'VChat',

        data: function () {
            return {
                messages: [],
                message: ''
            };
        },

        computed: {
            session(){
                return this.$store.state[Vue.prototype.room].session;
            },
            state(){
                return this.$store.state[Vue.prototype.room].state;
            }
        },

        methods: {
            send(){
                this.socket.emit('input', {session: this.session, message: this.message});
                this.message = '';
            }
        },

        mounted(){
            this.socket.on('output', msg => this.messages.unshift(msg));
        },

        beforeDestroy(){
            this.socket.off('output');
        }
    };
</script>