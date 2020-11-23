/* eslint-disable */
import {Mutation} from "vuex";
import AppState from "@/store/states/AppState";
import data from "@/data";

export const search: Mutation<AppState> = (state: AppState, payload?: any) => {
    // 搜索还是搜索后？
    console.log(state);
    console.log(payload);
}

// 把历史记录存入IndexedDB后刷新state
export const history: Mutation<AppState> = (state: AppState, payload?: any) => {
    const {db} = data;
    const table = db.table('search_histories')
    db.transaction('readwrite', table, () => {
        table.where('key').equals(payload.key)
            .delete()
            .then(() => table.add({
                ...payload,
                CreateAt: new Date(),
            }))
            .then(() => table.orderBy('CreateAt').reverse().offset(10).delete())
            .then(() => table.orderBy('CreateAt').toArray())
            .then(list => {
                state.histories = list.map((value, index) => ({...value, index: index + 1}));
            })
    })
}

export const reset: Mutation<AppState> = (state: AppState, payload?: any) => {
    const {db} = data;
    db.table('search_histories').clear()
}
