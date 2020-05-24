<template>
    <div class="chat">        
        <ul class="chat__messages">
            <li
                v-for="(message, i) in messages"
                :key="i"
                v-html="message"
            />
        </ul>

        <form v-on:submit.prevent="send">
            <input
                v-model="message"
                autocomplete="off"
                placeholder="type your message here..."
                class=""
            />
            <button
                type="submit"
                v-text="'Send'"
            />
        </form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    
    export default {
        name: 'VChat',

        data: function () {
            return {
                messages: [],
                message: ''
            };
        },

        computed: mapState([
            'socket',
            'room'
        ]),

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