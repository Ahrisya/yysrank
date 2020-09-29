import Vuex from "vuex";
import {vuexLocal} from "./plugins/vuex-persist";
import Vue from "vue";
import AppState from "@/store/states/AppState";

Vue.use(Vuex);

const store = new Vuex.Store<AppState>({
    state: {},
    mutations: {
        test: state => {
            state.name = new Date().toUTCString();
        },
        RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
    },
    plugins: [vuexLocal.plugin]
});


export default store;
