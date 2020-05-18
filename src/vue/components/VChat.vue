<template>
    <div class="chat">        
        <ul>
            <li
                v-for="(message, i) in messages"
                :key="i"
                v-html="message"
            />
        </ul>

        <div>
            <input
                v-model="message"
                autocomplete="off"
                placeholder="type your message here..."
            />
            <button
                v-on:click="send"
                v-text="'Send'"
            />
        </div>
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

        props: [
            'socket',
            'room'
        ],

        methods: {
            send(){
                this.socket.emit('input', this.message);
                this.message = '';
            }
        },

        mounted(){
            this.socket.on('output', msg => this.messages.push(msg));
        }
    };
</script>