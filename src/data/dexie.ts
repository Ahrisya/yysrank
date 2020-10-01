import Dexie from "dexie";

const prefix = 'yys-rank';

export const db = new Dexie([prefix, 'db'].join('_'));
const version = 1;
/* eslint-disable @typescript-eslint/camelcase */
const schema = {
    search_histories: "++id,key,w,s,banList,thisTeamList,thatTeamList,data,CreateAt",
};
/* eslint-enable @typescript-eslint/camelcase */
db.version(version).stores(schema);

db.open();
