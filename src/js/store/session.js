export default {
    namespaced: true,
    
    state: () => ({
        session: null,
        state: null
    }),

    mutations: {
        newSession(state, payload){
            state.session = payload;
        },
        endSession(state, payload){
            state.session = null;
        },
        updateState(state, payload){
            state.state = payload;
        }
    },

    modules: {
        'question': require('./question').default
    }
};