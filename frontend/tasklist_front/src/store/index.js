import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import createPersistedState from "vuex-persistedstate";

const initialState = {
    count: 0,
}

const store = new Vuex.Store({
    state: {
        initialState
    },
    mutations: {
        increment(state) {
            console.log('test')
            state.count++
        },
        decrement(state) {
            state.count--
        }
    },
    actions: {},
    getters: {},
    plugins: [
        createPersistedState({
            key: 'wow'
        })
    ],
})

store.commit('increment')

export default store