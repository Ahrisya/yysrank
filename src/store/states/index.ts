import _AppState from "@/store/states/AppState";
import data from "@/data";

export type AppState = _AppState

const initialState: AppState = {
    histories: [],
}

const {db} = data;
const table = db.table('search_histories')
db.transaction('readonly', table, function () {
    table.orderBy('CreateAt').toArray()
        .then(list => {
            initialState.histories = list.map((value, index) => ({...value, index: index + 1}));
        })
})

export default initialState;
