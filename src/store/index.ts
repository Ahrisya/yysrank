import Vuex from "vuex";
import Vue from "vue";
import {history, search, reset} from "@/store/mutations"
import initialState, {AppState} from "@/store/states";

Vue.use(Vuex);

const store = new Vuex.Store<AppState>({
    state: initialState,
    mutations: {
        search,
        history,
        reset,
        // RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
    },
    // plugins: [vuexLocal.plugin]
});


export default store;
