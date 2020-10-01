// import VuexPersistence, {AsyncStorage} from "vuex-persist";
// import AppState from "@/store/states/AppState";
// import {store} from '@/data/localforage';
//
// // 通过类型擦拭的办法将LocalForage类型擦拭成AsyncStorage类型
// const storage = (store as unknown) as AsyncStorage;
//
// export const vuexLocal = new VuexPersistence<AppState>({
//     strictMode: true,
//     storage: storage,
//     asyncStorage: true,
//     // key: 'key',
//     supportCircular: true,
//     reducer: (state) => {
//         return {...state};
//     },
//
// });
//
// export default {
//     vuexLocal,
// };
